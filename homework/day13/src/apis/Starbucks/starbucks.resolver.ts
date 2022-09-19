import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/createStarbucks.input';
import { Starbucks } from './entities/starbucks.entity';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  //API
  constructor(private readonly starbucksService: StarbucksService) {}

  @Query(() => [Starbucks])
  fetchStarbucks() {
    return this.starbucksService.findMenus();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    return this.starbucksService.createMenu({ createStarbucksInput });
  }
}
