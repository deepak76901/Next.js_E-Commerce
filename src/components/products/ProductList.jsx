"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  selectAllProducts,
  selectTotalItems,
  fetchProductsByFilterAsync,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoryAsync,
} from "@/Redux/slices/ProductSlice";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/utils/Pagination";
import { ITEMS_PER_PAGE, discountedPrice } from "@/utils/constants";
import { Carousel } from "flowbite-react";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();

  const { products } = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const totalItems = useSelector(selectTotalItems);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];
  

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      // I was stuck here. cause i am using (newFilter[section.id]>1).
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (ele) => ele === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    console.log({ newFilter });

    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
    console.log({ sort });
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoryAsync());
  }, [dispatch]);

  const { theme } = useSelector((state) => state.theme);

  return (
    <div>
      <div
        className={`${
          theme === "dark" ? "text-white bg-gray-700" : "bg-white"
        } `}
      >
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            filters={filters}
            theme={theme}
          ></MobileFilter>
          <div className="h-56 sm:h-56 lg:flex lg:justify-start w-full hidden md:block ">
            <Carousel slideInterval={2000} className="w-full rounded-none">
              <Image
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/fd78c56eb85bafd5.jpg?q=20"
                alt="..."
                fill
              />
              <Image
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3af219e83718806b.jpg?q=20"
                alt="..."
                fill
              />
              <Image
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ed4591126ff69acb.png?q=20"
                alt="..."
                fill
              />
              <Image
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/4d946b3cdabec95f.png?q=20"
                alt="..."
                fill
              />
              <Image
                src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/25e306273d3609bc.jpg?q=20"
                alt="..."
                fill
              />
            </Carousel>
            {/* <Image src="https://Image.freepik.com/premium-vector/up-50-off-banner_217752-218.jpg" alt="sale" className="m-10 rounded-xl  invisible lg:visible" /> */}
          </div>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="flex items-baseline justify-between border-b border-gray-200 py-5">
              <h1
                className={`ml-5 sm:ml-0 text-2xl sm:text-4xl font-bold tracking-tight text-gray-800 ${
                  theme === "dark" && "text-white bg-gray-700"
                }`}
              >
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button
                      className={`group inline-flex justify-center text-sm font-medium text-gray-700  ${
                        theme === "dark" && "text-white"
                      }`}
                    >
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
                        theme === "dark"
                          ? "text-white bg-gray-900 "
                          : "bg-white"
                      }`}
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(e, option)}
                                className={`font-medium cursor-pointer px-1 py-1 text-center text-sm  ${
                                  theme === "dark"
                                    ? "text-white bg-gray-700 hover:bg-gray-400"
                                    : "text-gray-600 bg-white"
                                }${active && "bg-gray-500"}`}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  {/* <Squares2X2Icon className="h-5 w-5" aria-hidden="true" /> */}
                </button>
                <button
                  type="button"
                  className="-m-2 ml-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-2 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-10 pt-5">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter
                  handleFilter={handleFilter}
                  filters={filters}
                  theme={theme}
                ></DesktopFilter>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <ProductGrid products={products} theme={theme}></ProductGrid>
                </div>
              </div>
            </section>
            <Pagination
              page={page}
              setPage={setPage}
              handlePage={handlePage}
              totalItems={totalItems}
              theme={theme}
            ></Pagination>
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
  theme,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-40 lg:hidden ${
          theme === "dark" && "text-white bg-gray-700"
        } `}
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className={`relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto  py-4 pb-12 shadow-xl ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between px-4  ${
                  theme === "dark" && "text-white bg-gray-700"
                }`}
              >
                <h2
                  className={`text-lg font-medium text-gray-900 ${
                    theme === "dark" && "text-white"
                  }`}
                >
                  Filters
                </h2>
                <button
                  type="button"
                  className={`-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 ${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  }`}
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form
                className={`mt-4 border-t ${
                  theme === "dark"
                    ? "text-white bg-gray-700 hover:text-gray-100"
                    : "border-gray-200"
                }`}
              >
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6 "
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button
                            className={`flex w-full items-center justify-between  px-2 py-3 text-gray-400 hover:text-gray-500 ${
                              theme === "dark"
                                ? "bg-gray-700 hover:text-gray-100"
                                : "bg-white"
                            }`}
                          >
                            <span
                              className={`font-medium text-gray-900 ${
                                theme === "dark" &&
                                "bg-gray-700 text-white hover:text-gray-100"
                              }`}
                            >
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className={`ml-3 min-w-0 flex-1 ${
                                    theme === "dark"
                                      ? "text-white bg-gray-700"
                                      : "text-gray-500"
                                  } `}
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter, filters, theme }) {
  return (
    <>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-5"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button
                    className={`flex w-full items-center justify-between  py-3 text-sm  hover:text-gray-500 ${
                      theme === "dark"
                        ? "text-white bg-gray-700"
                        : "text-gray-400 bg-white"
                    }`}
                  >
                    <span
                      className={`font-medium  ${
                        theme === "dark"
                          ? "text-white bg-gray-700"
                          : "text-gray-900"
                      }`}
                    >
                      {section.name}
                    </span>
                    <span
                      className={`ml-6 flex items-center ${
                        theme === "dark" ? "dark-theme hover:text-gray-100" : ""
                      }`}
                    >
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className={`flex items-center ${
                          theme === "dark"
                            ? "dark-theme hover:text-gray-100"
                            : ""
                        }`}
                      >
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className={`ml-3 text-sm ${
                            theme === "dark" ? "text-white" : "text-gray-600"
                          } `}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
}

function ProductGrid({ products, theme }) {
  return (
    <>
      {products && (
        <div
          className={`${
            theme === "dark" ? "text-white bg-gray-800" : "bg-white"
          } `}
        >
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <Link href={`/product-detail/${product._id}`} key={product._id}>
                  <div
                    className={`group relative border-solid border-2 rounded-lg  p-2 ${
                      theme === "dark" ? "border-gray-300" : "border-gray-500"
                    } `}
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 md:h-60">
                      <Image
                        src={product.thumbnail}
                        alt={product.imageAlt}
                        width={500}
                        height={600}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3
                          className={`text-sm text-gray-700 ${
                            theme === "dark"
                              ? "dark-theme hover:text-gray-100"
                              : ""
                          }`}
                        >
                          <div href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </div>
                        </h3>
                        <p
                          className={`mt-1 text-sm text-gray-500 ${
                            theme === "dark"
                              ? "dark-theme hover:text-gray-100"
                              : ""
                          }`}
                        >
                          <StarIcon className="w-6 h-6 inline "></StarIcon>
                          {product.rating}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium text-gray-900 ${
                            theme === "dark"
                              ? "dark-theme hover:text-gray-100"
                              : ""
                          } `}
                        >
                          ${discountedPrice(product)}
                        </p>
                        <p
                          className={`text-sm font-medium text-gray-500 line-through ${
                            theme === "dark" ? "strik  hover:text-gray-100" : ""
                          }`}
                        >
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    {product.deleted && (
                      <div>
                        <p className="text-sm text-red-400">Product Deleted </p>
                      </div>
                    )}
                    {product.stock <= 0 && (
                      <div>
                        <p className="text-sm text-red-400">Out of Stock </p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
