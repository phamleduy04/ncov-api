# ncov-api
API cung cấp thông tin, dữ liệu bệnh nhân về COVID-19!

[![issue](https://img.shields.io/github/issues/phamleduy04/ncov-api?style=for-the-badge)](https://github.com/phamleduy04/ncov-api/issues)
[![package.json](https://img.shields.io/github/package-json/v/phamleduy04/ncov-api?label=Package.json&style=for-the-badge)](https://github.com/phamleduy04/ncov-api/blob/master/package.json)
[![GitHub contributors](https://img.shields.io/github/contributors/phamleduy04/ncov-api?color=g&style=for-the-badge)](https://img.shields.io/github/contributors/phamleduy04/ncov-api?color=g&style=for-the-badge)
[![Visits Badge](https://badges.pufler.dev/visits/phamleduy04/ncov-api?style=for-the-badge)](https://badges.pufler.dev)
![GitHub top language](https://img.shields.io/github/languages/top/phamleduy04/ncov-api?style=for-the-badge)
[![David](https://img.shields.io/david/phamleduy04/ncov-api?style=for-the-badge)](https://david-dm.org/phamleduy04/ncov-api)
[![DeepScan grade](https://deepscan.io/api/teams/11483/projects/18299/branches/446016/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11483&pid=18299&bid=446016)



## Cách setup API chạy local
### Yêu cầu: node + mongodb + yarn
- Bước 1: Clone repo về máy
- Bước 2: `yarn`
- Bước 3: Tạo file `.env` và nhập `MONGODB=` sau đó là link mongodb
- Bước 4: `yarn run dev` để bắt đầu server. ( Nếu bạn muốn test các endpoints thì hãy edit file test sau đó sử dụng `yarn run test` ) để chạy
- Nếu bạn set `NODE_ENV=dev` trong `.env` thì lần sau bạn chạy app sẽ không chạy scraper lúc bắt đầu app nữa.
