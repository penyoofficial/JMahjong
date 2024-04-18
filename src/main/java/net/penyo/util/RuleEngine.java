package net.penyo.util;

import java.util.Map;

/**
 * 规则引擎
 *
 * @author Penyo
 */
public interface RuleEngine<Rule> extends Map<Rule, Callback<Boolean>> {
    /**
     * 链式增加规则。
     */
    default RuleEngine<Rule> append(Rule name, Callback<Boolean> fn) {
        put(name, fn);
        return this;
    }

    /**
     * 检查输入是否能够完全通过引擎的检查。
     */
    default boolean test(Object... argus) {
        for (Callback<Boolean> fn : this.values())
            if (!fn.run(argus)) return false;
        return true;
    }
}
