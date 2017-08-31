import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import {FilterItem} from 'components'
import {Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Collapse} from 'antd'
import city from '../../utils/city'

// class App extends Component {
//   constructor() {
//     super();
//     this.state = { show: false };
//   }
//
//   handleClose() {
//
//   }

const Search = Input.Search
const {RangePicker} = DatePicker
const Panel = Collapse.Panel


const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
}

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },

}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

// const hidden = {
//   display: 'none',
// }
//
// const show = {
//   display: 'block',
// }


// const handleCari = () => {
//   Panel.disabled = false
// }

// const handleClose = () => {
//   this.getElementById('container').style.display('none')
// }

// const Cari = React.createClass({
//   getInitialState: function () {
//     return { showResult: false }
//   },
//   handleCari: function(){
//     this.setState({showResult: true})
//   }
// })
// const app = this.refs.containerr

// class Layout extends React.Component {
//   handleClose () {
//     this.refs.containerr.style = { display: 'none' }
//   }
//   render () {
//     return (
//       this.handleClose()
//     )
//   }
// }

// constructor( props ) {
//   this.state = { show: true }
//   this.handleCari = this.handleCari.bind(this)
// }

// handleCari = () => {
//   const { show } = this.state
//   this.setState( {show: !show })
// }


const Filter = ({
  onAdd,
  onShow,
  onHide,
  customer,
  dispatch,
  onSearch,
  onClose,
  onFilterChange,
  searchVisible,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
  ...filterProps
  }) => {

  console.log('Filter', searchVisible)

  // const { colVisible, colType } = customer
  //
  // const modalProps = {
  //   // item: modalType === 'create' ? {} : currentItem,
  //   visible: colVisible,
  //   maskClosable: false,
  //   // confirmLoading: loading.effects['customer/update'],
  //   title: `${modalType === 'create' ? 'Create Customer' : 'Update Customer'}`,
  //   wrapClassName: 'vertical-center-modal',
  //   onShow (data) {
  //     dispatch({
  //       type: 'customer/showCol',
  //       payload: data,
  //     })
  //   },
  //   onHide () {
  //     dispatch({
  //       type: 'customer/hideCol',
  //     })
  //   },
  // }

  const handleFields = (fields) => {
    const {createTime} = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleCari = () => {
    // this.getElementById('container').style.display('block')
    // this.refs.container.style.display('block')
    // this.refs.containerr.style = { display: 'block' }
    // document.getElementById(this.state.baction).style.display('block')
    // object.style.display('block')
    // Panel.style = { display: 'block' }
    // this.Panel.style = { display: 'block' }
    // let object = this.getElementById('container')
    // object.style = { display: 'block' }
    // container.style.display('block')
    // this.getElementById(container).style.display('block')
    // this.setState({ showResults: false })
    // const { tampil } = this.state
    // this.setState({ show: !show })
    // this.getElementById(this.state.container).style.display('block')let object = ReactDOM.findDOMNode(this.refs.containerr)
    // object.style.display('block')
    // this.getElementById('container').style.visibility = 'visible
    // ReactDOM.findDOMNode(this.refs.container).style = { display: 'block' }

    this.getElementById('container').style.display('block')
  }

  // handleCari:function () => {
  //   // console.log('You clicked: ', this.state.baction );
  //   document.getElementById(this.state.baction).style.display('block')
  // }

  const handleClose = () => {
    //   // this.getElementById('container').style = { hidden }
    //   // object.style.display('hidden')
    //   // this.state.showMyComponent ? {} : { display: 'none' }
    //   this.getElementById('container').style.display('none')
    //   Panel.style = { display: 'none' }
    //   let object = this.getElementById('container')
    //   object.style.display('none')
    //   this.container.style.display('none')
    //   const { tampil } = this.state
    //   this.setState({ show: true })
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }


  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const {name, address} = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  // const handleOk = () => {
  //   validateFields((errors) => {
  //     if (errors) {
  //       return
  //     }
  //     const data = {
  //       ...getFieldsValue(),
  //       key: item.key,
  //     }
  //     // data.address = data.address.join(' ')
  //     onOk(data)
  //   })
  // }

  // const colOpts = {
  //   ...filterProps,
  //   onShow: handleOk,
  // }

  const filterOpts = {
    ...filterProps,
  }

  return (

    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 8}} md={{span: 24}}>
        {searchVisible && <Collapse defaultActiveKey={['1']}>
          <Panel header="Search" key="1" style={customPanelStyle}>
            <Col {...ColProps} xl={{span: 4}} md={{span: 8}}>
              {getFieldDecorator('name', {initialValue: name})(<Search placeholder="Search Name" size="large" onSearch={handleSubmit}/>)}
            </Col>
            <Col {...ColProps} xl={{span: 4}} md={{span: 8}}>
              {getFieldDecorator('address', {initialValue: address})(
                <Cascader
                  size="large"
                  style={{width: '100%'}}
                  options={city}
                  placeholder="Please pick an address"
                  onChange={handleChange.bind(null, 'address')}
                />)}
            </Col>
            <Col {...ColProps} xl={{span: 6}} md={{span: 8}} sm={{span: 12}}>
              <FilterItem label="Createtime">
                {getFieldDecorator('createTime', {initialValue: initialCreateTime})(
                  <RangePicker style={{width: '100%'}} size="large" onChange={handleChange.bind(null, 'createTime')}/>
                )}
              </FilterItem>
            </Col>
            <Col {...TwoColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}}>
              <div style={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <div>
                  <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>Search</Button>
                  <Button size="large" className="margin-right" onClick={handleReset}>Reset</Button>
                  <Button size="large" className="margin-right" onClick={onHide}>Close</Button>
                </div>
              </div>
            </Col>
          </Panel>
        </Collapse>}
      </Col>

      <Col {...TwoColProps} xl={{span: 10}} md={{span: 24}} sm={{span: 24}} {...filterOpts}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <div>
            <Button size="large" type="ghost" className="margin-right" onClick={onAdd}>Add</Button>
            <Button size="large" type="ghost" className="margin-right">Print</Button>
            <Button size="large" type="ghost" className="margin-right" onClick={onShow}>Cari</Button>
          </div>
        </div>
      </Col>

    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  customer: PropTypes.object,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  dispatch: PropTypes.func,
  onSearch: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}


export default Form.create()(Filter)

// const object = document.getElementById('container')
// ReactDOM.render(<Layout />, object)
