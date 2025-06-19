/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-23 15:30:41
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-23 15:31:04
 * @FilePath: /interview-coding/basic-knowledge/react/redux/connect.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Context = React.createContext(null)

function Provider(props) {
  const { store } = props
  const { getState, subscribe } = store
  const [state, setState] = React.useState(getState())
  React.useEffect(() => {
    const unsubscribe = subscribe(() => {
      setState(getState())
    })
    return unsubscribe
  }, [])
  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}