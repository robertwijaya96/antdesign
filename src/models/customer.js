/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { create, remove, update } from 'services/customer'
import * as customersService from 'services/customers'
import { pageModel } from './common'


const { query } = customersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'customer',

  state: {
    currentItem: {},
    modalVisible: false,
    searchVisible: false,
    modalType: 'create',
    colType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}customerIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/customer') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      console.log('queryMasuk sini', payload)
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 5,
              pageSizeOptions: Number(payload.pageSizeOptions) || [5, 10, 20, 50],
              total: data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.customer)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(customersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },


    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ customer }) => customer.currentItem.id)
      const newCustomer = { ...payload, id }
      const data = yield call(update, newCustomer)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {


    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    showCol (state, { payload }) {
      return { ...state, ...payload, searchVisible: true }
    },

    hideModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },

    hideCol (state, { payload }) {
      return { ...state, ...payload, searchVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}customerIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
