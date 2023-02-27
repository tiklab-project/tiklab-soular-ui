/**
 * @name: tablePage
 * @author mahai
 * @date 2022/7/11 7:24 PM
 * @description tablePage
 */
const deleteSuccessReturnCurrenPage = (total, pageSize, current) => {
    const maxCurrentCount = current * pageSize;
    const minCurrentCount = (current - 1) * pageSize + 1;
    if (total >= maxCurrentCount) {
        return current
    }
    if (total <= minCurrentCount) {
        return current === 1 ? 1 : current - 1
    }
    return current

}

export default deleteSuccessReturnCurrenPage
