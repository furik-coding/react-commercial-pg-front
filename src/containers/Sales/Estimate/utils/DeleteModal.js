import { message, Modal } from 'antd';

export const openDeleteModal = (estimate, deleteEstimate, refetch, setDeleted) => {
  const { confirm } = Modal;
  confirm({
    title: 'Вы уверены что хотите удалить?',
    centered: true,
    onOk() {
      return deleteEstimate({
        variables: {
          id: estimate.key,
        },
      })
        .then(({ data }) => {
          if (data.deleteSalesAdditionalCost) {
            refetch().then(() => { setDeleted({deleted: true})});
            message.success('Успешно удалено.');
          }
          if (data.deleteNonRtsReservation) {
            refetch().then(() => setDeleted({deleted: true}))
            message.success('Успешно удалено.');
          }
        })
        .catch((err) => {
          console.log(err);
          message.error('Что то пошло не так...');
        });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
