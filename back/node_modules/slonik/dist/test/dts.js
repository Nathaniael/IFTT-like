"use strict";
/* eslint-disable no-new */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const expect_type_1 = require("expect-type");
const src_1 = require("../src");
const VALUE = 'foo';
const connection = (0, src_1.createPool)('postgres://');
const poolTypes = () => {
    const pool = (0, src_1.createPool)('postgres://localhost');
    (0, expect_type_1.expectTypeOf)().toMatchTypeOf();
    (0, expect_type_1.expectTypeOf)().toEqualTypeOf();
    (0, expect_type_1.expectTypeOf)(pool).toHaveProperty('configuration').toEqualTypeOf();
    const promise = pool.connect(async (poolConnection) => {
        const result = await poolConnection.query((0, src_1.sql) `SELECT 1`);
        (0, expect_type_1.expectTypeOf)(result).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(result.rows[0]).toEqualTypeOf();
        void poolConnection.query((0, src_1.sql) `
      SELECT 1
      FROM foo
      WHERE bar = ${'baz'}
    `);
        // Query methods
        await poolConnection.any((0, src_1.sql) `SELECT foo`);
        await poolConnection.anyFirst((0, src_1.sql) `SELECT foo`);
        await poolConnection.exists((0, src_1.sql) `SELECT foo`);
        await poolConnection.many((0, src_1.sql) `SELECT foo`);
        await poolConnection.manyFirst((0, src_1.sql) `SELECT foo`);
        await poolConnection.maybeOne((0, src_1.sql) `SELECT foo`);
        await poolConnection.maybeOneFirst((0, src_1.sql) `SELECT foo`);
        await poolConnection.one((0, src_1.sql) `SELECT foo`);
        await poolConnection.oneFirst((0, src_1.sql) `SELECT foo`);
        // Disallow raw strings
        // @ts-expect-error
        await poolConnection.query('SELECT foo');
        const transaction1 = await poolConnection.transaction(async (transactionConnection) => {
            await transactionConnection.query((0, src_1.sql) `INSERT INTO foo (bar) VALUES ('baz')`);
            await transactionConnection.query((0, src_1.sql) `INSERT INTO qux (quux) VALUES ('corge')`);
            return {
                transactionResult: 'foo',
            };
        });
        (0, expect_type_1.expectTypeOf)(transaction1).toEqualTypeOf();
        const transaction2 = await poolConnection.transaction(async (t1) => {
            await t1.query((0, src_1.sql) `INSERT INTO foo (bar) VALUES ('baz')`);
            return await t1.transaction((t2) => {
                return t2.query((0, src_1.sql) `INSERT INTO qux (quux) VALUES ('corge')`);
            });
        });
        (0, expect_type_1.expectTypeOf)(transaction2).toEqualTypeOf();
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const transaction3 = await poolConnection.transaction(async (t1) => {
            await t1.query((0, src_1.sql) `INSERT INTO foo (bar) VALUES ('baz')`);
            try {
                await t1.transaction(async (t2) => {
                    await t2.query((0, src_1.sql) `INSERT INTO qux (quux) VALUES ('corge')`);
                    return await Promise.reject(new Error('foo'));
                });
            }
            catch (_a) {
                /* empty */
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        (0, expect_type_1.expectTypeOf)(transaction3).toEqualTypeOf();
        return {
            connectResult: 'foo',
        };
    });
    (0, expect_type_1.expectTypeOf)(promise).resolves.toEqualTypeOf();
    void pool.query((0, src_1.sql) `SELECT * FROM table WHERE name = '${VALUE}'`);
    const typedQuery = async () => {
        const getFooQuery = (limit) => {
            return (0, src_1.sql) `select foo from foobartable limit ${limit}`;
        };
        const getFooBarQuery = (limit) => {
            return (0, src_1.sql) `select foo, bar from foobartable limit ${limit}`;
        };
        (0, expect_type_1.expectTypeOf)(await pool.query(getFooBarQuery(10))).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(await pool.exists(getFooQuery(10))).toBeBoolean();
        (0, expect_type_1.expectTypeOf)(await pool.oneFirst(getFooQuery(10))).toBeString();
        (0, expect_type_1.expectTypeOf)(await pool.one(getFooBarQuery(10))).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(await pool.maybeOneFirst(getFooQuery(10))).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(await pool.maybeOne(getFooBarQuery(10))).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(await pool.any(getFooBarQuery(10))).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(await pool.anyFirst(getFooQuery(10))).toEqualTypeOf();
        (0, expect_type_1.expectTypeOf)(await pool.anyFirst(getFooBarQuery(10))).toEqualTypeOf();
    };
    (0, src_1.createPool)('postgres://localhost', {
        interceptors: [
            {
                afterPoolConnection: async (context, conn) => {
                    await conn.query((0, src_1.sql) `LOAD 'auto_explain'`);
                    await conn.query((0, src_1.sql) `SET auto_explain.log_analyze=true`);
                    await conn.query((0, src_1.sql) `SET auto_explain.log_format=json`);
                    await conn.query((0, src_1.sql) `SET auto_explain.log_min_duration=0`);
                    await conn.query((0, src_1.sql) `SET auto_explain.log_timing=true`);
                    await conn.query((0, src_1.sql) `SET client_min_messages=log`);
                    return null;
                },
                transformRow: (context, query, row, fields) => {
                    (0, expect_type_1.expectTypeOf)(context.queryId).toBeString();
                    (0, expect_type_1.expectTypeOf)(query.sql).toBeString();
                    (0, expect_type_1.expectTypeOf)(fields[0].dataTypeId).toBeNumber();
                    (0, expect_type_1.expectTypeOf)(row.foo).toEqualTypeOf();
                    return row;
                },
            },
        ],
    });
};
const interceptorTypes = () => {
    (0, src_1.createPool)('postgres://', {
        interceptors: [],
    });
    const interceptors = [
        {
            afterQueryExecution: (queryContext) => {
                (0, expect_type_1.expectTypeOf)(queryContext).toEqualTypeOf();
                (0, expect_type_1.expectTypeOf)(queryContext.sandbox.foo).toBeUnknown();
                // @ts-expect-error
                const foo = queryContext.sandbox + 1;
                return null;
            },
        },
    ];
    const conn = (0, src_1.createPool)('postgres://', {
        interceptors,
    });
    void conn.any((0, src_1.sql) `
    SELECT
        id,
        full_name
    FROM person
  `);
};
//
// TYPE PARSER
// ----------------------------------------------------------------------
const typeParserTypes = () => {
    const typeParser = {
        name: 'int8',
        parse: (value) => {
            (0, expect_type_1.expectTypeOf)(value).toBeString();
            return Number.parseInt(value, 10);
        },
    };
    (0, src_1.createPool)('postgres://', {
        typeParsers: [
            typeParser,
        ],
    });
    (0, src_1.createPool)('postgres://', {
        typeParsers: [
            ...(0, src_1.createTypeParserPreset)(),
        ],
    });
    (0, src_1.createBigintTypeParser)();
    (0, src_1.createTimestampTypeParser)();
    (0, src_1.createTimestampWithTimeZoneTypeParser)();
};
const recipes = async () => {
    await connection.query((0, src_1.sql) `
    INSERT INTO (foo, bar, baz)
    SELECT *
    FROM ${src_1.sql.unnest([
        [
            1,
            2,
            3,
        ],
        [
            4,
            5,
            6,
        ],
    ], [
        'int4',
        'int4',
        'int4',
    ])}
  `);
};
const dynamicWhere = async () => {
    const uniquePairs = [
        [
            'a',
            1,
        ],
        [
            'b',
            2,
        ],
    ];
    let placeholderIndex = 1;
    const whereConditionSql = uniquePairs
        .map((needleColumns) => {
        return needleColumns
            .map((column) => {
            return `${column} = $${placeholderIndex++}`;
        })
            .join(' AND ');
    })
        .join(' OR ');
    const values = [];
    for (const pairValues of uniquePairs) {
        values.push(...pairValues);
    }
};
const sqlTypes = async () => {
    // ExpectType SqlSqlToken
    const query0 = (0, src_1.sql) `SELECT ${'foo'} FROM bar`;
    // ExpectType SqlSqlToken
    const query1 = (0, src_1.sql) `SELECT ${'baz'} FROM (${query0})`;
    await connection.query((0, src_1.sql) `
    SELECT ${src_1.sql.identifier([
        'foo',
        'a',
    ])}
    FROM (
      VALUES
      (
        ${src_1.sql.join([
        src_1.sql.join([
            'a1',
            'b1',
            'c1',
        ], (0, src_1.sql) `, `),
        src_1.sql.join([
            'a2',
            'b2',
            'c2',
        ], (0, src_1.sql) `, `),
    ], (0, src_1.sql) `), (`)}
      )
    ) foo(a, b, c)
    WHERE foo.b IN (${src_1.sql.join([
        'c1',
        'a2',
    ], (0, src_1.sql) `, `)})
  `);
    await connection.query((0, src_1.sql) `
    SELECT (${src_1.sql.json([
        1,
        2,
        {
            other: 'test',
            test: 12,
        },
    ])})
  `);
    await connection.query((0, src_1.sql) `
    SELECT (${src_1.sql.json('test')})
  `);
    await connection.query((0, src_1.sql) `
    SELECT (${src_1.sql.json(null)})
  `);
    await connection.query((0, src_1.sql) `
    SELECT (${src_1.sql.json(123)})
  `);
    await connection.query((0, src_1.sql) `
    SELECT (${src_1.sql.json({
        nested: {
            object: {
                is: {
                    and: new Date('123').toISOString(),
                    other: 12,
                    this: 'test',
                },
            },
        },
    })})
  `);
    // @ts-expect-error
    (0, src_1.sql) `SELECT ${src_1.sql.json(undefined)}`;
    await connection.query((0, src_1.sql) `
    SELECT bar, baz
    FROM ${src_1.sql.unnest([
        [
            1,
            'foo',
        ],
        [
            2,
            'bar',
        ],
    ], [
        'int4',
        'text',
    ])} AS foo(bar, baz)
  `);
    (0, src_1.sql) `
    SELECT 1
    FROM ${src_1.sql.identifier([
        'bar',
        'baz',
    ])}
  `;
};
const createSqlTagTypes = () => {
    const sqlTag = (0, src_1.createSqlTag)();
    sqlTag `
    SELECT 1;
  `;
    const normalizeIdentifier = (input) => {
        return input.split('').reverse().join('');
    };
};
const errorTypes = () => {
    new src_1.SlonikError();
    new src_1.NotFoundError();
    new src_1.DataIntegrityError();
    new src_1.InvalidConfigurationError();
    new src_1.StatementCancelledError(new Error('Foo'));
    new src_1.StatementTimeoutError(new Error('Foo'));
    new src_1.IntegrityConstraintViolationError(new Error('Foo'), 'some-constraint');
    new src_1.NotNullIntegrityConstraintViolationError(new Error('Foo'), 'some-constraint');
    new src_1.ForeignKeyIntegrityConstraintViolationError(new Error('Foo'), 'some-constraint');
    new src_1.UniqueIntegrityConstraintViolationError(new Error('Foo'), 'some-constraint');
    new src_1.CheckIntegrityConstraintViolationError(new Error('Foo'), 'some-constraint');
};
const samplesFromDocs = async () => {
    // some samples generated by parsing the readme from slonik's github page
    // start samples from readme
    const sample1 = async () => {
        await connection.query((0, src_1.sql) `
      INSERT INTO (foo, bar, baz)
      SELECT *
      FROM ${src_1.sql.unnest([
            [
                1,
                2,
                3,
            ],
            [
                4,
                5,
                6,
            ],
        ], [
            'int4',
            'int4',
            'int4',
        ])}
    `);
    };
    const sample2 = async () => {
        await connection.query((0, src_1.sql) `
      SELECT (${src_1.sql.array([
            1,
            2,
            3,
        ], 'int4')})
    `);
        await connection.query((0, src_1.sql) `
      SELECT (${src_1.sql.array([
            1,
            2,
            3,
        ], (0, src_1.sql) `int[]`)})
    `);
    };
    const sample3 = async () => {
        (0, src_1.sql) `SELECT id FROM foo WHERE id = ANY(${src_1.sql.array([
            1,
            2,
            3,
        ], 'int4')})`;
        (0, src_1.sql) `SELECT id FROM foo WHERE id != ALL(${src_1.sql.array([
            1,
            2,
            3,
        ], 'int4')})`;
    };
    const sample4 = async () => {
        await connection.query((0, src_1.sql) `
      SELECT bar, baz
      FROM ${src_1.sql.unnest([
            [
                1,
                'foo',
            ],
            [
                2,
                'bar',
            ],
        ], [
            'int4',
            'text',
        ])} AS foo(bar, baz)
    `);
    };
    const sample5 = async () => {
        (0, src_1.sql) `
      SELECT 1
      FROM ${src_1.sql.identifier([
            'bar',
            'baz',
        ])}
    `;
    };
    // end samples from readme
};
const exportedTypes = () => {
    // make sure CommonQueryMethods is exported by package
    (0, expect_type_1.expectTypeOf)().toHaveProperty('any').toBeCallableWith((0, src_1.sql) `select 1`);
};
//# sourceMappingURL=dts.js.map