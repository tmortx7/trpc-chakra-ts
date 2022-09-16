DB_URL=postgres://root:root@localhost:5432/dbdata?sslmode=disable

network:
	docker network create mynetwork
postgres:
	docker run --name postgres14 --network mynetwork -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -d postgres:14-alpine

pgadmin:
	docker run -p 5050:80 --network mynetwork -e 'PGADMIN_DEFAULT_EMAIL=admin@admin.com' -e 'PGADMIN_DEFAULT_PASSWORD=root' -d dpage/pgadmin4

createdb:
	docker exec -it postgres14 createdb --username=root --owner=root dbdata

dropdb:
	docker exec -it postgres14 dropdb dbdata

redis:
	docker run --name redis --network mynetwork -p 6379:6379 -d redis

.PHONY: postgres createdb dropdb pgadmin