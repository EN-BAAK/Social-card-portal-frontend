import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useAppContext } from '../context/AppProvider'
import Button from '../components/Button'
import AddMediaModal from '../components/AddMediaModal'
import Loading from '../components/Loading'
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useMutation } from 'react-query'
import { deleteMedia } from '../api-cilent'
import { Media } from '../misc/types'
import { FaPlus } from "react-icons/fa";


const SocialMedias = (): React.JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)

  const { showToast, showWarning, medias, fetchMedias } = useAppContext()

  const mutationDelete = useMutation(deleteMedia, {
    onSuccess: async () => {
      showToast({ message: "One media deleted successfully", type: "SUCCESS" })
      await fetchMedias()
    },
    onError: () => {
      showToast({ message: "Failed delete media", type: "ERROR" })
    },
  })

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

  const handleModalVisibility = () => {
    setIsModalVisible(true)
  }

  const fetchMediasData = async () => {
    setIsLoading(true)
    await fetchMedias()
    setIsLoading(false)
  }

  useEffect(() => {
    if (medias && medias.length === 0 && !isLoading)
      fetchMediasData()

  }, [])

  if (isLoading)
    return <Loading />

  return (
    <div id='medias' className='h-screen position-relative'>
      <div className="window overflow-auto text-center">
        {medias.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Icon</th>
                <th>Arabic Name</th>
                <th>English Name</th>
              </tr>
            </thead>
            <tbody>
              {medias && medias.length > 0 && medias.map(media => (
                <tr key={media.id}>
                  <td className='w-fit'>
                    <button
                      onClick={() => trashClick(media.id, media.name_en)}
                      className='border-0 bg-danger text-white rounded-1 transition-3'>
                      <FaRegTrashAlt fontSize={15} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMedia(media)
                        setIsModalVisible(true)
                      }}
                      className='ms-md-1 mt-md-0 mt-1 border-0 bg-warning text-white rounded-1 transition-3'>
                      <CiEdit fontSize={15} />
                    </button>
                  </td>
                  <td>
                    {media.id}
                  </td>
                  <td className='bg-black'><img src={`data:image/jpeg;base64,${media.img}`} alt="" /></td>
                  <td>{media.name_ar}</td>
                  <td>{media.name_en}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3 className='text-center mt-5 text-danger fw-bold'>No data exist</h3>
        )}
      </div>

      {isModalVisible && <AddMediaModal
        onClose={() => {
          setIsModalVisible(false)
          setSelectedMedia(null)
        }}
        id={selectedMedia?.id || -1}
        initialValues={{
          name_ar: selectedMedia?.name_ar || "",
          name_en: selectedMedia?.name_en || "",
          show_link: selectedMedia?.show_link || false,
        }}
      />}

      <Button right={25} bottom={10} onClick={handleModalVisibility} > <FaPlus fontSize={36} /></Button>
    </div >
  )
}

export default SocialMedias
