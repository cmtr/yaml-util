/**
 * Key Predicate
 * 
 * @author Harald Blikø
 */


module.exports = (key, argLength=1) => (path, value) => {

    const pathPredicate = (path, value) => {
        if (typeof path !== "string") return false;
        if (path.split("/").pop() !== key) return false;
        if (typeof value !== "string") return false;
        if (value.split(" ").length !== argLength) return false;
        return true;
    }

    // Reference Key as part of the Value
    const valuePredicate = (value) => {
        if (typeof value !== "string") return false;
        const split = value.split(" ");
        if (split.length !== (argLength + 1)) return false;
        if (split[0] !== key) return false;
        return true;
    }

    const isActionable = (path, value) => {
        const isPath = pathPredicate(path, value);
        const isValue = valuePredicate(value);
        return  (isPath || isValue) && !(isPath && isValue);
    }

    return isActionable(path, value);
}