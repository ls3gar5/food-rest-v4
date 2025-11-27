import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class SimulationRequestDto {
  @IsNumber()
  amountRequested: number
  @IsNumber()
  productId: number
  tags: string[]
  @ApiProperty({
      description: 'Flow Id',
  })
  @IsString()
  flowId: string
  @ApiProperty({
      description: 'Client Id',
  })
  @IsString()
  clientId: string
  segment: SegmentData
}

export interface SimulationResponseDto {
  id: string
  amountRequested: number
  productId: number
  clientId: string
  generationDate: string
  expirationDate: string
  segmentData: SegmentData
  installmentsPlans: InstallmentsPlan[]
}

export interface SegmentData {
  mid: string
  mcc: string
}

export interface InstallmentsPlan {
  id: string
  installmentsAmount: number
  installmentsQuantity: number
  totalAmount: number
  amountDetail: AmountDetail
  rates: Rates
  firstDueDate: string
  daysDueQuantity: number
}

export interface AmountDetail {
  grantAmount: number
  interestAmount: number
  initialGrantAmount: number
  sealingAmount: number
  netExpensesAmount: number
  vatExpensesAmount: number
  netInsuranceAmount: number
  vatInsuranceAmount: number
  requestedNetCapital: number
}

export interface Rates {
  tna: number
  tem: number
  cftea: number
  tea: number
  cftna: number
  cft: number
}
