import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/repository-base";
import { Register } from "src/schemas/register.schema";

@Injectable()
export class RegisterRepository extends BaseRepository<Register> {
  constructor(
    @InjectModel("Register") private readonly registerModel: Model<Register>
  ) {
    super(registerModel);
  }

  public async findByPeriod(
    accountId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Register[]> {
    return await this.registerModel
      .find({
        account: accountId,
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .populate("category").exec();
  }
}
