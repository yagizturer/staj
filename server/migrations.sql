DROP TABLE IF EXISTS "user_read_books";
DROP TABLE IF EXISTS "user_plan_to_read";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "books";
DROP TABLE IF EXISTS "authors";

CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "user_type" SMALLINT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "year" SMALLINT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_read_books"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "rating" SMALLINT,

    CONSTRAINT "user_read_books_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_plan_to_read"(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "user_plan_to_read_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "user_read_books" ADD CONSTRAINT "user_read_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_read_books" ADD CONSTRAINT "user_read_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_plan_to_read" ADD CONSTRAINT "user_plan_to_read_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_plan_to_read" ADD CONSTRAINT "user_plan_to_read_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "books" ADD CONSTRAINT "books_authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;