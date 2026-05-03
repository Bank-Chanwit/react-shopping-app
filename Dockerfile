# Stage 1: Build stage
FROM node:20-alpine AS build
WORKDIR /react-shopping-app/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# ลบไฟล์เริ่มต้นของ Nginx ออกก่อน
RUN rm -rf /usr/share/nginx/html/*
# คัดลอกไฟล์ที่ build เสร็จแล้วจาก Stage แรกมาวาง
COPY --from=build /react-shopping-app/app/build /usr/share/nginx/html

# คัดลอกไฟล์คอนฟิกที่เราเขียนในข้อ 1 ไปทับของเดิมใน Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3030
CMD ["nginx", "-g", "daemon off;"]