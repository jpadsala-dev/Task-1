import { model } from "mongoose"
import companySchema, { Company } from "../schemas/company.schema"

export default model<Company>("company-details", companySchema)