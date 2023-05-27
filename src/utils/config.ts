import { ThemeConfig } from 'antd'

// Read more about configurations for AntDesign theme
// https://ant.design/components/config-provider#components-config-provider-demo-theme
// 
// In this app, we primarily use the themeConfig for colors across all antDesign components.
// This means other styling aspects (ex: padding) are not effected by this config and CSS modules are used
// to configure those styles.
export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#1890ff',
        colorText: '#fff',
    },
    components: {
        Table: {
            colorTextHeading: 'black',
            colorText: 'black'
        }
    }
}
