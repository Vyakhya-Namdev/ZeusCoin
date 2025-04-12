import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Loader from "../components/common/Loader";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Search";
import PaginationComponent from "../components/Pagination";
import BackToTop from "../components/common/BackToTop";
import { get100Coins } from "../functions/get100Coins";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const coinsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filteredCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCoins = filteredCoins.slice(
    (page - 1) * coinsPerPage,
    page * coinsPerPage
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const mycoins = await get100Coins();
    if (mycoins.length > 0) {
      setCoins(mycoins);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={paginatedCoins} />
          {filteredCoins.length > 0 ? (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
              totalPages={Math.ceil(filteredCoins.length / coinsPerPage)}
            />
          ) : (
            <p style={{ textAlign: "center", color: "gray" }}>
              Search Not Found
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default DashboardPage;
