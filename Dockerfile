# Stage 1: Build Angular frontend
# We override outputPath so the build goes to a known location inside the container
FROM node:20-alpine AS angular-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
# Build Angular; angular.json outputPath is ../src/DonorManagement.Api/wwwroot
# which resolves to /app/src/DonorManagement.Api/wwwroot inside this stage
RUN npm run build

# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /app/server
COPY server/ ./
RUN dotnet publish src/DonorManagement.Api/DonorManagement.Api.csproj \
    -c Release \
    -o /app/publish

# Stage 3: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy published .NET app
COPY --from=dotnet-build /app/publish ./

# Copy Angular build output into wwwroot/browser
# angular.json outputs to ../src/DonorManagement.Api/wwwroot relative to /app/client
# so the built files land at /app/src/DonorManagement.Api/wwwroot/browser
COPY --from=angular-build /app/src/DonorManagement.Api/wwwroot/browser ./wwwroot/browser

# Create directory for SQLite database (will be mounted as volume)
RUN mkdir -p /data

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080
ENV ConnectionStrings__DefaultConnection="Data Source=/data/DonorManagement.db"

ENTRYPOINT ["dotnet", "DonorManagement.Api.dll"]
