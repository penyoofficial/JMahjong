package net.penyo.jmahjong.rule;

import net.penyo.jmahjong.type.InteractionType;
import net.penyo.util.HashRuleEngine;

/**
 * 互动规则
 *
 * @author Penyo
 */
public class Interaction extends HashRuleEngine<InteractionType> {

    public Interaction() {
        put(InteractionType.CAN_CHOW, (Object) -> null);
    }
}
