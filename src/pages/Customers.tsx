import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppProvider'
import { Table } from 'react-bootstrap'
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { deleteCustomer } from '../api-cilent';
import { useMutation } from 'react-query';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import SearchBar from '../components/SearchBar';
import { searchText } from '../misc/helpers';

const Customers = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const navigateTo = useNavigate()
  const { customers, fetchCustomers, showWarning, showToast } = useAppContext()
  const mutationDelete = useMutation(deleteCustomer, {
    onSuccess: async () => {
      showToast({ message: "One customer deleted successfully", type: "SUCCESS" })
      await fetchCustomers()
    },
    onError: () => {
      showToast({ message: "Failed delete customer", type: "ERROR" })
    },
  })

  const fetchCustomersData = async () => {
    setIsLoading(true)
    await fetchCustomers()
    setIsLoading(false)
  }

  const trashClick = (id: number, name: string) => {
    showWarning({
      message: `Are you sure you want to delete ${name} ?`,
      btn1: "Cancel",
      btn2: "Delete",
      handleBtn2: () => {
        mutationDelete.mutate(id)
      }
    })
  }

  useEffect(() => {
    if (customers && customers.length === 0 && !isLoading)
      fetchCustomersData()

  }, [])

  if (isLoading)
    return <Loading />

  return (
    <div id='customers' className='h-screen position-relative'>
      <div className="window overflow-auto text-center">
        {customers.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Name</th>
                <th>Domain Name</th>
                <th>Desc</th>
              </tr>
            </thead>
            <tbody>
              {customers && customers.length > 0
                && customers
                  .filter(customer => showSearchBar ? (searchText(search, customer.name) || searchText(search, customer.domain_name)) : true)
                  .map(customer => (
                    <tr key={customer.id}>
                      <td className='w-fit'>
                        <button
                          onClick={() => trashClick(customer.id, customer.name)}
                          className='border-0 bg-danger text-white rounded-1 transition-3'>
                          <FaRegTrashAlt fontSize={15} />
                        </button>
                        <button
                          onClick={() => {
                            navigateTo(`/create-customer/${customer.id}`)
                          }}
                          className='ms-md-1 mt-md-0 mt-1 border-0 bg-warning text-white rounded-1 transition-3'>
                          <CiEdit fontSize={15} />
                        </button>
                      </td>
                      <td>
                        {customer.id}
                      </td>
                      <td>{customer.name}</td>
                      <td><Link to={`/${customer.domain_name}`}>{customer.domain_name}</Link></td>
                      <td>{customer.desc}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        ) : (
          <h3 className='text-center mt-5 text-danger fw-bold'>No data exist</h3>
        )}
      </div>

      <SearchBar
        value={search}
        dispatch={setSearch}
        styleHolder={`${showSearchBar ? "active" : ""} transition-3`}
        styleInput='rounded-pill py-1 px-3 bg-light-subtle shadow border border-2 border-black transition-3'
      />


      <Button right={25} bottom={10} onClick={() => navigateTo("/create-customer")} >
        <FaPlus fontSize={36} />
      </Button>
      <Button right={85} bottom={10} onClick={() => setShowSearchBar(!showSearchBar)} >
        <IoSearch fontSize={36} />
      </Button>
    </div>
  )
}

export default Customers
