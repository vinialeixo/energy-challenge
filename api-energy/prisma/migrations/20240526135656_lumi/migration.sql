-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT,
    "installationNumber" TEXT,
    "referenceMonth" INTEGER,
    "referenceYear" INTEGER,
    "powerQuantity" DOUBLE PRECISION NOT NULL,
    "powerValue" DOUBLE PRECISION NOT NULL,
    "sceeePowerQuantity" DOUBLE PRECISION NOT NULL,
    "sceeePowerValue" DOUBLE PRECISION NOT NULL,
    "compensatedPowerQuantity" DOUBLE PRECISION NOT NULL,
    "compensatedPowerValue" DOUBLE PRECISION NOT NULL,
    "publicContribution" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
