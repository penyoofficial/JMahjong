package net.penyo.util;

import java.util.Map;
import java.util.function.Function;

/**
 * 规则引擎
 *
 * @author Penyo
 */
public interface RuleEngine<Rule> extends Map<Rule, Function<Object, Boolean>> {
    /**
     * 链式增加规则。
     */
    default RuleEngine<Rule> append(Rule name, Function<Object, Boolean> fn) {
        put(name, fn);
        return this;
    }

    /**
     * 检查输入是否能够完全通过引擎的检查。
     */
    default boolean test(Object... argus) {
        for (Function<Object,Boolean> fn : this.values())
            if (!fn.apply(argus)) return false;
        return true;
    }
}
