import { DileInputTagsMixin } from '@dile/ui/components/input-tags/index.js';
import { DileAjaxInputSuggestions } from '../../ajax-input-suggestions/src/DileAjaxInputSuggestions.js';

/**
 * # dile-ajax-input-tags
 *
 * Tags editor that requests its suggestions to `endpoint`, with the same API as
 * dile-ajax-input-suggestions. See DileInputTagsMixin in `@dile/ui`.
 */
export class DileAjaxInputTags extends DileInputTagsMixin(DileAjaxInputSuggestions) {}
