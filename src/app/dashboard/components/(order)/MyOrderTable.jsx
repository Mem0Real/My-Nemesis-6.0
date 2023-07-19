import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Suspense,
} from "react";

import CustomerRow from "./orderData2/CustomerRow";
import AlertDialog from "./AlertDialog";

import { useOrderDataContext } from "./Order";
import { setCookie, parseCookies } from "nookies";

const OrderContext = createContext({});

export default function MyOrderTable() {
  const [cus, setCus] = useState({ id: null, open: false });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [removeData, setRemoveData] = useState();

  const { order, delivered } = useOrderDataContext();
  const customers = order[0];

  const cookieStore = parseCookies();

  useEffect(() => {
    // const data = window.localStorage.getItem("Customer");
    let data;
    if (cookieStore?.Customer !== "undefined")
      data = JSON.parse(cookieStore.Customer);
    setCus(() => data);
  }, []);

  useEffect(() => {
    // window.localStorage.setItem("Customer", JSON.stringify(cus));
    setCookie(null, "Customer", JSON.stringify(cus));
  }, [cus]);

  const customerDropDown = (customerId) => {
    if (!cus.id) {
      setCus({ id: customerId, open: true });
    } else {
      if (cus.id === customerId) {
        setCus({ ...cus, open: !cus.open });
      } else {
        setCus({ id: cus.id, open: false });
        setCus({ id: customerId, open: true });
      }
    }
  };

  const alertDialogOpen = (id) => {
    setDialogOpen(true);
    setRemoveData(() => ({ entry: "customers", id: id }));
  };

  const alertDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <OrderContext.Provider
      value={{
        cus,
        setCus,
        customerDropDown,
        alertDialogOpen,
      }}
    >
      <div className="table-container text-neutral-800">
        <div className="mx-auto w-[95%] md:w-[75%] overflow-auto">
          <table className="table-fixed w-full text-sm">
            <thead className="border-b border-black">
              <tr className="">
                <th className="text-center md:text-start py-5 w-24">Name</th>
                <th className="text-center md:text-start py-5 w-24">
                  Phone No.
                </th>
                <th className="w-16" />
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <h1 className="text-4xl text-neutral-800 bg-neutral-300 mx-auto">
                    Loading...
                  </h1>
                }
              >
                {customers.map((customer) =>
                  delivered ? (
                    <React.Fragment key={customer.id}>
                      <CustomerRow customer={customer} />
                    </React.Fragment>
                  ) : (
                    customer.delivered === false && (
                      <React.Fragment key={customer.id}>
                        <CustomerRow customer={customer} />
                      </React.Fragment>
                    )
                  )
                )}
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog
        data={removeData}
        open={dialogOpen}
        handleClose={alertDialogClose}
      />
    </OrderContext.Provider>
  );
}
export const useOrderContext = () => useContext(OrderContext);
