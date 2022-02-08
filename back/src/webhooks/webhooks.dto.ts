import { Type } from "class-transformer"

class Repository {
  readonly full_name:string
  readonly html_url:string
}

export class GithubDto {
  @Type(() => Repository)
  readonly repository: Repository
}
