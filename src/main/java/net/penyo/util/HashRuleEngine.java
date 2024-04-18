package net.penyo.util;

import java.util.HashMap;

/**
 * 哈希规则引擎
 *
 * @author Penyo
 */
public abstract class HashRuleEngine<Rule> extends HashMap<Rule, Callback<Boolean>> implements RuleEngine<Rule> {
}
