# --- Giai đoạn 1: Build môi trường (có thể bỏ qua nếu dự án nhỏ)
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# --- Giai đoạn 2: Tạo image chạy thật
FROM node:18-slim

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .

# Mở cổng ứng dụng
EXPOSE 8686

# Lệnh chạy khi container khởi động
CMD ["npm", "start"]
