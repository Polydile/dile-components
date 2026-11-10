import { DileInputSuggestions } from '../../input-suggestions/src/DileInputSuggestions.js';
import { DileInputTagsMixin } from './DileInputTagsMixin.js';

/**
 * # dile-input-tags
 *
 * Tags editor with local suggestions (the `suggestions` property, like
 * dile-input-suggestions). See DileInputTagsMixin. The Ajax variant,
 * `dile-ajax-input-tags`, lives in `@dile/crud`.
 */
export class DileInputTags extends DileInputTagsMixin(DileInputSuggestions) {}
