import React from 'react';

import Table from '../../../components/Tablea/Tablea';

const PanelDesign = () => {
  const columns = [
    {
      title: 'код проекта',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 80,
    },
    {
      title: 'Дата начала',
      dataIndex: 'date',
      width: 90,
    },
    {
      title: 'Рекламодатель',
      dataIndex: 'advert',
      width: 100,
    },
    {
      title: 'Рекламное агенство',
      dataIndex: 'advert_agency',
      width: 100,
    },

    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },

    {
      title: 'Сумма без НДС',
      dataIndex: 'sum',
      width: 100,
    },
    {
      title: 'Общая сумма',
      dataIndex: 'all_sum',
      width: 100,
    },
  ];
  const data = [
    {
      key: 1,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 2,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 3,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 4,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 5,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
  ];

  // const INVOICE_T = gql`
  //   query SearchInvoice(
  //     $date: String
  //     $projectCode String
  //     $applicationNumber String
  //     $brand String
  //     $advertiser String
  //     $advAgency String
  //     $respManager String
  //     $advManager String
  //   ) {
  //     searchInvoice(
  //       var1: $date // rename variables from albot
  //       var2: $projectCode
  //       var3: $applicationNumber
  //       var4: $brand
  //       var5: $advertiser
  //       var6: $advAgency
  //       var7: $respManager
  //       var8: $advManager
  //     ) {
  //       edges {
  //         node {
  //           // add variables
  //         }
  //       }
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(INVOICE_T, { variables: filter });
  // if (error) return <p>Error :(</p>;
  // if (loading) return <h3></h3>;
  // if (data) {
  //   data1 = data.searchInvoice.edges.map((item) => ({
  //     date: item.node.date
  //   }));
  // }
  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </>
  );
};

export default PanelDesign;
