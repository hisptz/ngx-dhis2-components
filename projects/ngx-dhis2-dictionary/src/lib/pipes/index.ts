import { SearchIndicatorGroupPipe } from './search-indicator-group.pipe';
import { FilterBySearchInputPipe } from './filter-by-search-input.pipe';
import { FilterIndicatorsByGroupIdPipe } from './filter-indicators-by-group-id.pipe';
import { ShortenNamePipe } from './shorten-name.pipe';

export const pipes: any[] = [
  SearchIndicatorGroupPipe,
  FilterBySearchInputPipe,
  FilterIndicatorsByGroupIdPipe,
  ShortenNamePipe
];
