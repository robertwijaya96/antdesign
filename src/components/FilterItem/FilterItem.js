import React from 'react'
import PropTypes from 'prop-types'
import styles from './FilterItem.less'

// class Child extends React.Component {
//   render () {
//     return (<div>I'm the child</div>);
//   }
// }
// class ShowHide extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       childVisible: false
//     }
//   }
//   render () {
//     return (
//       <div>
//         <div onClick={() => this.handleCari()}>
//           Parent - click me to show/hide my child
//         </div>
//         {
//           this.state.childVisible
//             ? <Child />
//             : null
//         }
//       </div>
//     )
//   }
//   onClick () {
//     this.setState({ childVisible: !this.state.childVisible })
//   }
// }

const FilterItem = ({
  label = '',
  children,
}) => {
  const labelArray = label.split('')

  return (
    <div className={styles.filterItem}>
      {labelArray.length > 0
        ? <div className={styles.labelWrap}>
          {labelArray.map((item, index) => <span className="labelText" key={index}>{item}</span>)}
        </div>
        : ''}
      <div className={styles.item}>
        {children}
      </div>

    </div>
  )
}



FilterItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default FilterItem
