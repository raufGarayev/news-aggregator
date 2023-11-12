import { ReactNode } from "react"
import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, IRootStore } from "../../../redux/store"
import './customModal.sass'
import { toggleModal } from "../../../redux/slices/localSlice"


const CustomModal = ({
    children,
    footerModal,
    extraClass
}: {
    children: ReactNode,
    footerModal?: ReactNode,
    extraClass?: string
}) => {

    const dispatch = useDispatch<AppDispatch>()
    const {modal} = useSelector((state: IRootStore) => state.local)

    const handleCancelModal = () => {
        dispatch(toggleModal(''))
    }

  return (
    <Modal
        className={`customModal ${extraClass}`}
        open={modal.open}
        onCancel={handleCancelModal}
        footer={footerModal}
    >
        {children}
    </Modal>
  )
}

export default CustomModal