package net.penyo.util;

import java.util.HashMap;
import java.util.function.Function;

/**
 * 哈希规则引擎
 *
 * @author Penyo
 */
public abstract class HashRuleEngine<Rule> extends HashMap<Rule, Function<Object, Boolean>> implements RuleEngine<Rule> {
}
