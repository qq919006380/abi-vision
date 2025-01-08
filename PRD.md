https://github.com/shazow/whatsabi

- 落地页
    - 开源，安全
    - 简洁，人机交互
    - 存储，本地存储
- [network][contract]
    - 添加编辑/编辑合约
        - 常规链：如果用户当前链不在我定义的常规链里面，那么就select下面就自动添加一个option value是使用当前链接的网络
        - 添加/编辑自定义链
        (localhost) - Hardhat Provider
            注意: 要在您的系统里运行 Hardhat 网络节点, 进到 hardhat 项目目录并且运行命令:
            npx hardhat node
            更多信息, 访问: Hardhat 文档
            Hardhat JSON-RPC Endpoint:
            http://127.0.0.1:8545
        (localhost) - Foundry Provider
            注意: 要在您的系统里运行 Anvil, 运行:
            curl -L https://foundry.paradigm.xyz | bash
            anvil
            更多信息, 访问: Foundry 文档
            Anvil JSON-RPC Endpoint:
            http://127.0.0.1:8545


    - tabs
        - 只读
        - 查询
        - 操作
    - tools
        - 分享
        - 查看ABI [可视化ABI]
        - 查看区块链浏览器
        - 编辑
        - 删除
    - indexDB结构
        {
            [chainId]:{
                contract-address:{
                    abi,address,chainId,name
                },
                contract-address:{
                    abi,address,chainId,name
                }
            }
        }
    - 可视化测试脚本：可以拖拽一个测试流程图，然后按顺序去测试