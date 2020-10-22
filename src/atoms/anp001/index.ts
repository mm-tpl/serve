import an14 from '@mmstudio/an000014';

export default async function anp1<T>(sql: string, ...args: unknown[]) {
	// sql查询
	/**
	 * 数据库返回值
	 */
	const [r1603335417] = await (() => {
		const p1 = 'db001';	// 配置文件mm.json中数据库的dbs中配置的数据库名称，如db001,sys等
		// postgres:	insert into tb001 (name) values ($1),($2),($3);
		// mysql:		insert into tb001 (name) values (?),(?),(?);
		return an14<T>(p1, [sql, args]);
		// return an14<T1, T2>(p1, [p21, p22], [p31, p32]);
		// const p2 = [
		// 	['sql1', ['param1']]，
		// 	['sql2', ['param2']]，
		// 	['sql3', ['param3']]，
		// 	// ...
		// 	['sqln', ['paramn']]
		// ];
		// return an14<T1, T2, T3, ...Tn>(p1, ...p2);
	})();
	return r1603335417;
}
