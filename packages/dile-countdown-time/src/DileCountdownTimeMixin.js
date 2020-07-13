export const DileCountdownTimeMixin = (Superclass) => {
    return class extends Superclass {
        lpad(input, length) {
            return ('0' + input).slice(length);
        }
    }
}