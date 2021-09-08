import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { Upload, message, Modal } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  BlockBody,
  ImageBody,
  Medium,
  Row,
  BlockTitle,
  InputTitle,
} from '../../../../Styles/StyledBlocks';
import { StyledInput } from '../../../../Styles/DesignList/styles';
import { BtnStyledSecondary } from '../../../../Styles/ButtonStyles';

import photo from '../../../../../img/outdoor_furniture/photo_load.png';
import anchorIcon from '../../../../../img/input/anchor.svg';

import { constructContext } from '../../../../../containers/Base/Construction/Construction';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UPLOAD_IMG = gql`
  mutation($id: ID!, $photo: Upload) {
    updateConstruction(
    id: $id
    input: {
      photo: $photo
    }) {
      construction {
        id
        photo
      }
    }
  }
`;

export default function Others() {
  const { id } = useParams();

  const [item, setItem] = useContext(constructContext);
  const [loading, setLoading] = useState(false);

  let [visible, setVisible] = useState(false)
  let [codeValue, setCodeValue] = useState("");
  let [title, setTitle] = useState("");

  const handleOk = e => setVisible(false);
  const handleCancel = e => setVisible(false);

  const [uploadImage] = useMutation(UPLOAD_IMG);

  const uploadImg = ({ file, onSuccess }) => {
    setLoading(true);

    uploadImage({
      variables: {
        id: id,
        file: file
      }
    })
      .then((res) => {
        setLoading(false);
        setItem({
          ...item,
          photo: res.data.updateConstruction.construction.photo
        })
        message.success('File uploaded successfully');
      })
      .catch((error) => {
        setLoading(false);
        message.error('Is not a upload');
        console.error(error);
      })
  };

  return (
    <Medium style={{ minHeight: 600 }}>
      <BlockTitle>Другие параметры</BlockTitle>
      <BlockBody>
        <Row>
          <ImageBody>
            <img
              src={item.photo ? `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${item.photo}` : photo}
              alt="avatar"
              width="100%"
              height="100%"
            />
          </ImageBody>
          <div style={{ width: '60%' }}>
            <div>
              <InputTitle>Ссылка</InputTitle>
              <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.otherLink ? item.otherLink : ''}
              onChange={(e) => setItem({ ...item, otherLink: e.target.value })}></StyledInput>

            </div>
            <div style={{ marginTop: '20px' }}>
              <InputTitle>Координаты</InputTitle>
              <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.coordinates ? item.coordinates : ''}
              onChange={(e) => setItem({ ...item, coordinates: e.target.value })}></StyledInput>

            </div>
          </div>
        </Row>
        <Row>
          <Upload
              name="avatar"
              showUploadList={false}
              customRequest={uploadImg}
              beforeUpload={beforeUpload}
          >
            <BtnStyledSecondary type="button">
              Загрузить фото
              {
                loading &&
                <CircularProgress
                    size={10}
                    style={{ marginLeft: 10, color: '#ffffff' }}
                />
              }
            </BtnStyledSecondary>
          </Upload>

        </Row>
      </BlockBody>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <pre>
          {codeValue}
        </pre>
      </Modal>
    </Medium>
  );
}
