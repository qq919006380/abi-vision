https://github.com/shazow/whatsabi

- 落地页
    - 开源，安全
    - 简洁，人机交互
    - 存储，本地存储
- [network][contract]
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