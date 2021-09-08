import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { gql, useMutation } from '@apollo/client';

import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Upload, message } from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton } from '../../../../Styles/DesignList/styles';

const UPLOAD_DOCUMENTS = gql`
  mutation($id: ID! $document: Upload) {
    updateLocation(
      id: $id,
      input: {
        document: $document
      }
    ) {
      location {
        id
        document
      }
    }
  }
`;

export const EditInformation = () => {
  const { id } = useParams();

  const [item, setItem] = useContext(locationContext);
  const [fileList, setFileList] = useState([]);
  const [uploadDocument] = useMutation(UPLOAD_DOCUMENTS);

  useEffect(() => {
    if(item.document) {
      setFileList([{
        uid: '-1',
        name: item.document.replace('location/', ''),
        status: 'done',
        url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${item.document}`,
      }])
    }
  }, []);

  const uploadRequest = (info) => {
    uploadDocument({
      variables: {
        id: id,
        document: info.file
      }
    })
      .then((res) => {
        const url = res.data.updateLocation.location.document;

        setItem({
          ...item,
          document: url
        })

        let fileList = [{
          uid: '-1',
          name: info.file.name,
          status: 'done',
          url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${url}`,
        }];

        setFileList(fileList);
        message.success('File uploaded successfully');
      })
      .catch((error) => {
        message.error('Is not a upload');
        console.error(error);
      })
  }
  const removeDoc = () => {
    uploadDocument({
      variables: {
        id: id,
        document: null
      }
    })
      .then((res) => {
        const url = res.data.updateLocation.location.document;

        setItem({
          ...item,
          document: url
        })

        setFileList([]);
        message.success('File deleted successfully');
      })
      .catch((error) => {
        message.error('Something went wrong');
        console.error(error);
      })
  }

  const uploadConfig = {
    name: 'file',
    customRequest(info) {
      uploadRequest(info);
    },
    onRemove() {
      removeDoc();
    }
  };

  return (
    <Medium style={{ width: '50%' }}>
      <BlockTitle>Документы на землю</BlockTitle>

      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Документы</InputTitle>
            <div className="doc-block">
              <Upload
                {...uploadConfig}
                fileList={fileList}
                listType="text"
              >
                <StyledButton
                  type="button"
                  className="block-edit-info__btn-upload"
                  style={{ margin: 0, backgroundColor: '#2C5DE5' }}
                >
                  Загрузить скан приложения (.pdf)
                </StyledButton>
              </Upload>
            </div>
            <style>
              {`
                .doc-block>span {
                  display: flex;
                  justify-content: space-between;
                  margin-top: 10px;
                }
              `}
            </style>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default EditInformation;
