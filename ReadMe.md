## 什么是redux
redux 是js状态容器，提供可预测化的状态管理，可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试
![](https://upload-images.jianshu.io/upload_images/5118914-2aec16088c854fb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 用户（操作view）发出Action,发出方式就用到了dispatch方法
* store自动调用reducer,并且传入两个参数（当前state和收到的action）,reducer会返回新的state,如果有middleware,store会将当前state和收到的action传递给middleware,middleware会调用reducer然后返回新的state
* state一旦有变化，store就会调用监听函数，来更新view

## redux的三个基本原则
* 单一数据源： 整个应用的state被储存在一棵object tree中，并且这个object tree只存在于唯一一个store中
* state是只读的，唯一改变state的方法就是触发action,action是一个用于描述已发生事件的普通对象
* 使用纯函数来执行修改，为了描述action如何改变state tree，需要编写reducers

### redux的构成
* action: 描述发生什么的对象
* reducer: 形式为（state,action） => state 的纯函数，功能是根据action修改state将其转变为下一个state
* store: 用于存储state,可看做一个容器，整个应用只能有一个store

### react-redux
* <Provider>组件： 组件包裹在整个组件树的最外层，这个组件让根组件的所有子孙组件能够轻松的使用connect()方法绑定store
* connect(): react-redux提供的方法，如果一个组件想要响应状态的变化，就把自己作为参数传给connect()的结果，connect()方法会处理与store绑定的细节，并通过selector确定该绑定store中哪一部分的数据
* selector: 自己编写的函数，函数声明了你的组件需要整个store中的哪一部分作为自己的props
* dispatch: 想要改变应用中的状态时，就dispatch一个action,这也是唯一改变状态的方法
