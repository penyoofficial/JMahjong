package net.penyo.util;

/**
 * 回调函数
 *
 * @author Penyo
 */
public interface Callback<Return> {
    /**
     * 运行。
     */
    Return run(Object... argus);
}
