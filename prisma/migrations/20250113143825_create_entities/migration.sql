-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_words" (
    "user_id" TEXT NOT NULL,
    "word_id" INTEGER NOT NULL,

    CONSTRAINT "favorite_words_pkey" PRIMARY KEY ("user_id","word_id")
);

-- CreateTable
CREATE TABLE "histories" (
    "user_id" TEXT NOT NULL,
    "word_id" INTEGER NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "histories_pkey" PRIMARY KEY ("user_id","word_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "words_name_key" ON "words"("name");

-- AddForeignKey
ALTER TABLE "favorite_words" ADD CONSTRAINT "favorite_words_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_words" ADD CONSTRAINT "favorite_words_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
