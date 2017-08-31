import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'


const Customer = ({ location, dispatch, customer, loading }) => {
  const { list, pagination, currentItem, modalVisible, searchVisible, modalType, isMotion, selectedRowKeys } = customer
  const { pageSize } = pagination

  console.log('Customer Visible',searchVisible)
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['customer/update'],
    title: `${modalType === 'create' ? 'Create Customer' : 'Update Customer'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `customer/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'customer/hideModal',
      })
    },
  }

  // const colProps = {
  //   item: modalType === 'create' ? {} : currentItem,
  //   visible: searchVisible,
  //   maskClosable: false,
  //   confirmLoading: loading.effects['customer/update'],
  //   title: `${modalType === 'create' ? 'Create Customer' : 'Update Customer'}`,
  //   wrapClassName: 'vertical-center-modal',
  //   onOk (data) {
  //     dispatch({
  //       type: 'customer/showCol',
  //       payload: data,
  //     })
  //   },
  //   onCancel () {
  //     dispatch({
  //       type: 'customer/hideCol',
  //     })
  //   },
  // }


  const listProps = {
    dataSource: list,
    loading: loading.effects['customer/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'customer/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'customer/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'customer/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    item: modalType === 'create' ? {} : currentItem,
    searchVisible: searchVisible,
    maskClosable: false,
    wrapClassName: 'vertical-center-modal',
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/customer',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/customer',
      }))
    },
    onAdd () {
      dispatch({
        type: 'customer/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onShow () {
      dispatch({
        type: 'customer/showCol',
        payload: {
          modalType: 'create',
        },
      })
    },
    onHide (data) {
      dispatch({
        type: 'customer/hideCol',
        payload: data,
      })
    },
    switchIsMotion () {
      dispatch({ type: 'customer/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'customer/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>

            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />

      {modalVisible && <Modal {...modalProps} />}

    </div>
  )
}

Customer.propTypes = {
  customer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ customer, loading }) => ({ customer, loading }))(Customer)
