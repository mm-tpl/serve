# 示例

<!-- TOC -->

- [1. vscode扩展](#1-vscode扩展)
- [2. 项目调试](#2-项目调试)
	- [2.1. 启动调试](#21-启动调试)
	- [2.2. 停止调试](#22-停止调试)
	- [2.3. 重启调试](#23-重启调试)
- [3. 原子操作](#3-原子操作)
	- [3.1. 分类](#31-分类)
	- [3.2. 创建方法](#32-创建方法)
	- [3.3. 通用型原子操作](#33-通用型原子操作)
	- [3.4. 项目级原子操作](#34-项目级原子操作)
		- [3.4.1. 示例](#341-示例)
	- [3.5. 代码模板snippet的写法](#35-代码模板snippet的写法)
- [4. 文件转换](#4-文件转换)
	- [4.1. 转pdf](#41-转pdf)
	- [4.2. 转word文档](#42-转word文档)
	- [4.3. 转xlsx表格](#43-转xlsx表格)
- [5. 文件服务](#5-文件服务)
	- [5.1. 配置](#51-配置)
	- [5.2. 上传](#52-上传)
	- [5.3. 下载](#53-下载)
	- [5.4. 上传office文档，转换为ppt和图片](#54-上传office文档转换为ppt和图片)
	- [5.5. 重新上传](#55-重新上传)
	- [5.6. 删除](#56-删除)
- [6. 获取ip](#6-获取ip)
- [7. 自定义路由](#7-自定义路由)
	- [7.1. 添加通用服务](#71-添加通用服务)
	- [7.2. 添加路由](#72-添加路由)
	- [7.3. 添加附加数据](#73-添加附加数据)
- [8. 前置路由过滤器](#8-前置路由过滤器)
- [9. 负载均衡](#9-负载均衡)
- [10. 两个单例服务](#10-两个单例服务)
	- [10.1. 编码服务](#101-编码服务)
	- [10.2. 定时任务](#102-定时任务)
- [11. 第三方库的引用](#11-第三方库的引用)
	- [11.1. 添加依赖](#111-添加依赖)
	- [11.2. 全局引用](#112-全局引用)
	- [11.3. amd](#113-amd)
	- [11.4. TypeScript定义](#114-typescript定义)
	- [11.5. 简单粗野的做法](#115-简单粗野的做法)

<!-- /TOC -->

<https://mm-works.github.io/>

## 1. vscode扩展

以下操作说明均以安装[mmstudio扩展](https://marketplace.visualstudio.com/items?itemName=mm.mmstudio)为前提.

## 2. 项目调试

### 2.1. 启动调试

启动项目调试的命令为`npm t`,简单的，可以通过`alt+d`快速打开终端并启动调试

### 2.2. 停止调试

找到启动命令的终端，按下`ctrl+c`停止命令，注意windows上经常会出现无法停止的情况，这种情况下，杀掉该终端即可。

### 2.3. 重启调试

先[停止调试](#22-停止调试)，再次启动调试即可

需要重启调试的情况：

1. 第一次添加某个公共的客户端原子操作后
1. 第一次添加某个公共控件后
1. 添加[自定义路由](#9-自定义路由)之后
1. 添加[前置路由过滤器](#10-前置路由过滤器)之后

## 3. 原子操作

在响应，服务，项目级原子操作中，均可引用原子操作。

举例一个常用的例子说明：比如一个项目中使用的数据库只有一个到两个，就可以将数据库名称封装进一到两个项目级原子操作中，从而减少调用时数据库名称传参。这样的做的好处是在数据库固定的情况下，可以加速项目的开发速度，且维护相对也简单。

### 3.1. 分类

原子操作分为通用型原子操作和项目级原子操作，通用型原子操作可以在任何项目中使用，其实现要求比较高。项目级原子操作则只要该项目可用即可。

### 3.2. 创建方法

通过vscode命令`mmstudio: Add new atom`创建。

### 3.3. 通用型原子操作

注意事项：

1. 最好先确定好原子操作的名称，因为它将展示给所有开发人员，尽可能将其描述精确、简练。
1. 希望加入团队的人员请[联系我](mailto:tao_qiufeng@126.com).我将非常乐意接受社区的贡献。
1. 原子操作要有单元测试，否则有可能将无法通过审核合并。

### 3.4. 项目级原子操作

可以在项目中实现某个通用操作,其代码实现制作为一个原子操作`index.ts`（目前限定其为某一个函数），并将其插入代码模板写入`use.snippet`。也可以将项目中常用的几个原子操作的使用编写为一个原子操作，在项目中快速引用。

#### 3.4.1. 示例

上面提到过，在项目中可以添加一些项目级的原子操作，以方便开发使用。例如某项目只有两个数据库，一个为配置库，一个为业务库，我们可以将对这两个数据库的原子操作进行简单封装，以方便项目使用。具体做法为

1. 在项目中添加项目级原子操作,快捷键为`alt+m a`
1. 参数个数设置为2个（如果没有参数，可以设置为0）
1. 使用快捷键添加sql查询原子操作`alt+t a`
1. 插入数据库原子操作（编号14），并修改参数如下所示：

	```ts
	import an14 from '@mmstudio/an000014';

	export default async function anp1<T>(sql: string, ...args: unknown[]) {
		// sql查询
		/**
		* 数据库返回值
		*/
		const [r1603335417] = await (() => {
			const p1 = 'db001';
			return an14<T>(p1, [sql, args]);
		})();
		return r1603335417;
	}
	```

1. 接下来，我们将代码模板修改好，如下所示

	```ts
	// 业务库sql查询
	/**
	 * ${0:查询数据表结果}
	 */
	const r$CURRENT_SECONDS_UNIX = await(() => {
		const p1 = '$1';	// sql，示例见下:
		// postgres:	insert into tb001 (name) values (\$1),(\$2),(\$3);
		// mysql:		insert into tb001 (name) values (?),(?),(?);
		interface ITable {
			id: string;
		}
		return anp1<ITable>(p1);
		// const p21 = 'mmstudio001';	// sql中占位符对应的参数值
		// const p22 = 'mmstudio002';	// sql中占位符对应的参数值
		// const p23 = 'mmstudio003';	// sql中占位符对应的参数值
		// return anp1<ITable>(p1, p21, p22, p23);
	})();
	```

1. 这样一个项目级的原子操作就完成了，使用它进行单表的查询将会变得非常简单。我们如果要在某个服务中使用它，只需要打开服务文件，使用快捷键`alt+t a`在`本地`选择`anp001`就可以快速添加了

### 3.5. 代码模板snippet的写法

其实上面的示例已经展示了代码模板的写法，下面为一些说明。

1. 普通的文本按原样插入到使用位置
1. `$`为一个特殊字符，如果要在代码模板中输入一个字符`$`，必须加上转义符`\`,即`\$`方可。
1. 如果`$`它后跟一个数字，如`$1`,`$2`，则表示一个停止符，在插入原子操作时通过tab键可以按`$`后的数字切换光标位置。
1. `$`后如果后跟大括号，如`${1}`,`${2}`，其作用同`$1`,`$2`。
1. `$`后大括号中数字后如跟`:`，如`${1:val}`，则`:`后为默认插入内容，当光标停留时默认内容将被选中，且可修改
1. `$`后大括号中数字后如跟`|`,需要保证大括号结束前也要有一个`|`，如`${1:|a,b,c|}`，则`|`之间的内容当光标停留时将按`,`分隔，作为枚举列表供选择，注意应当按实际使用场景调整顺序。
1. `$CURRENT_SECONDS_UNIX`为一个数字值，通常它是唯一的，可以用它作为变量名

## 4. 文件转换

### 4.1. 转pdf

使用服务端渲染的方法制作页面即可，然后将页面后缀(html)修改为pdf即可查看效果（如果是开发阶段，需要修改页面的端口为8889或其它在mm.json配置文件中配置好的端口号）

### 4.2. 转word文档

使用服务端渲染的方法制作页面，然后，然后将页面后缀(html)修改为xlsx即可查看效果（如果是开发阶段，需要修改页面的端口为8889或其它在mm.json配置文件中配置好的端口号）

### 4.3. 转xlsx表格

使用服务端渲染的方法制作页面，注意必须将页面使用`table`渲染，然后，然后将页面后缀(html)修改为xlsx即可查看效果（如果是开发阶段，需要修改页面的端口为8889或其它在mm.json配置文件中配置好的端口号），这是一种相对简单的做法，无法满足复杂表格（如带有公式等高级功能的表格）

## 5. 文件服务

通常使用控件和原子操作来完成。以下为简单介绍。

### 5.1. 配置

需要配置一个文件数据库

mm.json

```json
{
	"minio": {
		"endPoint": "127.0.0.1",
		"port": 9000,
		"accessKey": "mmstudio",
		"secretKey": "Mmstudio111111",
		"useSSL": false,
		"region": "cn-north-1",
		"partSize": 5242880
	}
}
```

同时需要启动一个文件数据库minio

[docker-compose安置](https://download.daocloud.io/Docker_Mirror/Docker_Compose)

```sh
[sudo] docker-compose -f db.yaml up
```

```yaml
version: '3.7'

services:
  minio:
    image: minio/minio
    container_name: minio
    command: server /data
    volumes:
      - /home/taoqf/data/minio:/data
    ports:
      - 9000:9000
    environment:
      MINIO_ACCESS_KEY: mmstudio
      MINIO_SECRET_KEY: Mmstudio123
```

### 5.2. 上传

当前项目页面地址/fsweb/upload，支持一次上传多个文件

### 5.3. 下载

当前项目页面地址/fsweb/getfile?id=xxx，如果是图片，不添加`download`参数直接展示在页面展示，如果要下载，请添加 `download` 参数，`download`参数支持以下几种形态.

1. /fsweb/getfile?id=xxx&downlaod
1. /fsweb/getfile?id=xxx&downlaod=false
1. /fsweb/getfile?id=xxx&downlaod=abc.jpe

如果一次性下载多个文件，请使用 `/fsweb/getfile?id=xxx,yyy,zzz`

### 5.4. 上传office文档，转换为ppt和图片

当前项目页面地址/fsweb/upload-office，支持选择性转换为图片。

### 5.5. 重新上传

当前项目页面地址/fsweb/reupload?id=xxx

### 5.6. 删除

当前项目页面地址/fsweb/delfile?id=xxx

## 6. 获取ip

在任意一个服务(s000.ts)中，可以通过`msg.realip`获得客户端ip。注意，如果使用了反向代理，请设置请求头`x-real-ip`或`x-forwarded-for`，如果反向代理设置了其它的ip（比如真实情况的反向代理为第三方），一般也可以通过`msg.headers.xxx`获取。

## 7. 自定义路由

在某些情况下，比如支付的回调等，我们需要第三方服务回调提供一些路由。

### 7.1. 添加通用服务

首先必须要先添加一个服务，由该服务响应该路由的请求，但也有可能是可能是某个组件下已完成的服务，这里以新建通用服务为例说明新建通用服务的方法。

因为我们希望把通用的服务单独列出目录来区分，比如希望通用的服务都放在`src/services`目录下以方便管理。

因为新建服务的逻辑是需要打开一个可编辑文件，这样新建的服务会位于该可编辑文件相同的目录下。所以我们新建**第一个服务**时会用到一些技巧。

1. 我们先在vscode中新建一个文件`src/services/mm`

	```sh
	touch src/services/mm
	```

1. 点击打开这个文件.
1. `alt+s`添加服务
1. 删除第一次添加的文件

	```sh
	rm src/services/mm
	```

1. 编写服务逻辑

### 7.2. 添加路由

1. `alt+r`添加路由
1. 选中服务`services/s001`
1. 使用`get`请求访问该路由（也有可能是`post`,`put`,`delete`,`all`，根据第三方服务情况而定）
1. [重启项目调试](#23-重启调试)
1. `curl http://localhost:8889/r001`即可触发调用服务

### 7.3. 添加附加数据

有时候，一个服务的逻辑几乎能被多个路由调用，又有一些**细微**的差别，这个时候，为了项目维护方便，通常不建议复制并修改原服务。我们有两种方法来实现：

1. 添加项目级服务端原子操作，将服务的逻辑封装起来，暴躁出某个参数，在不同服务中调用该原子操作。
1. 在路由定义中附加上该参数，将多个路由同时关联同一个服务，在服务中通过msg.foo获取到参数进行逻辑判定处理。

路由定义中附加参数的方法

在mm.json中找到`routers`下的多个路由，分别为它们附加参数（如`foo`)

```json
{
	"routers": [
		{
			"method": "get",
			"service": "searvices/s001",
			"url": "/r001",
			"data: {
				"foo": "bar1"
			}
		},
		{
			"method": "get",
			"service": "searvices/s001",
			"url": "/r002",
			"data: {
				"foo": "bar2"
			}
		}
	]
}
```

## 8. 前置路由过滤器

前置路由过滤器将提前将某个请求进行处理，其操作类似于添加路由。以下列出不同点：

1. 前置路由过滤器对应的服务返回的结果中如果有`data`，该请求将提前返回，后续路由逻辑全部跳过，但可以设置cookie，和响应头header。
1. 返回结果中可以有重定向`redirect`,如果有，请求也请提前返回，后续路由逻辑全部跳过，可同时设置cookie和响应头
1. 前置路由示波器通常使用通配符作为url，以下几种示例，都是正确的写法

	```json
	{
		"filters": [
			{
				"method": "get",
				"service": "searvices/s001",
				"url": "/*",
				"data: {}
			},
			{
				"method": "get",
				"service": "searvices/s001",
				"url": "/*.html",
				"data: {}
			},
			{
				"method": "get",
				"service": "searvices/s001",
				"url": "/mmstudio",
				"data: {}
			{
				"method": "get",
				"service": "searvices/s001",
				"url": "/m?studio",
				"data: {}
			{
				"method": "get",
				"service": "searvices/s001",
				"url": "/m+studio",
				"data: {}
			{
				"method": "get",
				"service": "searvices/s001",
				"url": "/mm(studio)?",
				"data: {}
			}
		]
	}
	```

## 9. 负载均衡

通常的nginx的反向代理，负载均衡就可以满足绝大多数大型应用（体量小的应用不用担心负载问题）

## 10. 两个单例服务

有些服务不能启动多个实例，所以需要独立部署为单例。这类服务在负荷大（非常大）时，将会拖慢整个应用的速度，所以在业务设计时，需要非常注意。

原理上来讲，这类服务是不可能通过增加结点实现的，除非修改设计，比如不在必要的时候不生成唯一的编码，使用uuid替代。

### 10.1. 编码服务

详见[调用编码服务原子操作](https://www.npmjs.com/package/@mmstudio/an000015)

### 10.2. 定时任务

使用vscode扩展添加定时任务配置。

服务详情见[定时任务服务](https://www.npmjs.com/package/@mmstudio/schedule)

## 11. 第三方库的引用

使用第三方库的时候，由于第三方库的代码质量我们无法保证，所以可能会有以下问题，列出以待查阅分析：

### 11.1. 添加依赖

1. 服务端原子操作如果引用第三方包，将务必将包依赖添加到package.json中的`dependencies`中。
1. 客户端原子操作如果引用第三方包，将务必将包依赖添加到package.json中的`devDependencies`中。
1. 控件如果引用第三方包，将务必将包依赖添加到package.json中的`devDependencies`中。

### 11.2. 全局引用

客户端原子操作或控件引用的第三包如果有全局引用，最常见的有`jquery`，这一类引用在使用时通常会有两种问题：

1. 需要在页面中通过script全局引入js文件
1. 打包时多个对jquery依赖的控件有可能会冲突，造成找不到jquery对象的问题
1. ts定义问题，使用全局还是模块引用需要权衡，多数国内jquery依赖的包质量不高，非常乱。

这里只指出解决问题的线索，具体问题请自行解决。

1. 根目录下的gulpfile.js，本地调试及打包相关
1. n.ts，打包相关

### 11.3. amd

虽然一些脚手架工具已经可以比较方便进行页面调试了，但是依然，会存在各种各样的奇怪问题，项目开发人员技术水平不过硬时，出现问题很难自行解决。并且通常地，当项目比较大时，执行速度过慢，从而导致开发效率降低。所以我们在开发过程中使用的是amd的加载方式，这种技术相对成熟，各种工具和第三方包的支持也比较好，万一出现问题也相对容易解决。但这会产生一些问题，即有部分第三方包并不提供amd的版本，虽然在打包时理论上可以使用，但无法开发调试。这就需要项目使用人员去开源贡献或是自行解决（配置amd.json文件，同时项目下添加amd的版本以供开发时使用，将commonjs版本修改umd版本并不复杂，通常只需要添加头尾即可）。amd.json的格式参看[amd加载器](https://www.npmjs.com/package/@dojo/loader#usage)中的相关说明。

### 11.4. TypeScript定义

有些第三方类库可能会缺少ts定义，如果是比较流行的类库，试试到`@types`下找一找。示例(xxx为类库名称)：

```sh
yarn add --dev @types/xxx
```

如果没有，可以到开源社区贡献。

### 11.5. 简单粗野的做法

如果不想贡献，还要使用第三方类库，在许可允许的范围内（哈哈），可以源码级引入，修改为ts，去掉全局依赖。当然，这种作法我个人并不推荐，但是当今国内开发的圈子里，这样做的不在少数，在项目工期比较紧且项目开发人员普遍素质不很高的情况下，这确实是项目开发成本比较低的一种方法，祝好运！
