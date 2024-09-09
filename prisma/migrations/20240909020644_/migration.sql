/*
  Warnings:

  - A unique constraint covering the columns `[cpf_cnpj]` on the table `Producer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Producer_cpf_cnpj_key" ON "Producer"("cpf_cnpj");
