import an1 from '@mmstudio/an000001';
import an4 from '@mmstudio/an000004';
import anp1 from '../atoms/anp001/index';

interface Message {
	// cookies: {
	// 	uk: string;
	// 	[key: string]: string
	// };
	// urls: {
	// 	base: string;
	// 	origin: string;
	// 	url: string;
	// };
	// query: {};
	// params: {};
	// headers: {};
	// captcha: string;
}

export default async function s001(msg: Message, actionid: string): Promise<an4> {
	an1(`Service begin path:pg001/s001,actionid:${actionid}`);
	// 业务库sql查询
	/**
	 * 查询数据表结果
	 */
	const r1603336745 = await (() => {
		const p1 = '';	// sql，示例见下:
		// postgres:	insert into tb001 (name) values ($1),($2),($3);
		// mysql:		insert into tb001 (name) values (?),(?),(?);
		interface ITable {
			field1: string;
		}
		return anp1<ITable>(p1);
		// const p21 = 'mmstudio001';	// sql中占位符对应的参数值
		// const p22 = 'mmstudio002';	// sql中占位符对应的参数值
		// const p23 = 'mmstudio003';	// sql中占位符对应的参数值
		// return anp1<ITable>(p1, p21, p22, p23);
	})();

	an1(`Service end path:pg001/s001,actionid:${actionid}`);
	return {
		data: '"mm"'
	} as an4;
}
