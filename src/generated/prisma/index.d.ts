/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model StaffMember
 *
 */
export type StaffMember = $Result.DefaultSelection<Prisma.$StaffMemberPayload>;
/**
 * Model Manager
 *
 */
export type Manager = $Result.DefaultSelection<Prisma.$ManagerPayload>;
/**
 * Model AttendanceRecord
 *
 */
export type AttendanceRecord = $Result.DefaultSelection<Prisma.$AttendanceRecordPayload>;
/**
 * Model ManagerAttendanceRecord
 *
 */
export type ManagerAttendanceRecord =
  $Result.DefaultSelection<Prisma.$ManagerAttendanceRecordPayload>;
/**
 * Model EventRecord
 *
 */
export type EventRecord = $Result.DefaultSelection<Prisma.$EventRecordPayload>;
/**
 * Model MeetingSchedule
 *
 */
export type MeetingSchedule = $Result.DefaultSelection<Prisma.$MeetingSchedulePayload>;
/**
 * Model Advertisement
 *
 */
export type Advertisement = $Result.DefaultSelection<Prisma.$AdvertisementPayload>;
/**
 * Model WeatherSetting
 *
 */
export type WeatherSetting = $Result.DefaultSelection<Prisma.$WeatherSettingPayload>;
/**
 * Model MovieSchedule
 *
 */
export type MovieSchedule = $Result.DefaultSelection<Prisma.$MovieSchedulePayload>;
/**
 * Model ItemSalesTarget
 *
 */
export type ItemSalesTarget = $Result.DefaultSelection<Prisma.$ItemSalesTargetPayload>;
/**
 * Model ConcessionPriceItem
 *
 */
export type ConcessionPriceItem = $Result.DefaultSelection<Prisma.$ConcessionPriceItemPayload>;
/**
 * Model DisplayPage
 *
 */
export type DisplayPage = $Result.DefaultSelection<Prisma.$DisplayPagePayload>;
/**
 * Model SystemSetting
 *
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const RecordStatus: {
    ACTIVE: 'ACTIVE';
    INACTIVE: 'INACTIVE';
    ARCHIVED: 'ARCHIVED';
  };

  export type RecordStatus = (typeof RecordStatus)[keyof typeof RecordStatus];

  export const AttendanceStatus: {
    PRESENT: 'PRESENT';
    ABSENT: 'ABSENT';
    LEAVE: 'LEAVE';
    LATE: 'LATE';
  };

  export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

  export const AdMediaType: {
    IMAGE: 'IMAGE';
    VIDEO: 'VIDEO';
  };

  export type AdMediaType = (typeof AdMediaType)[keyof typeof AdMediaType];
}

export type RecordStatus = $Enums.RecordStatus;

export const RecordStatus: typeof $Enums.RecordStatus;

export type AttendanceStatus = $Enums.AttendanceStatus;

export const AttendanceStatus: typeof $Enums.AttendanceStatus;

export type AdMediaType = $Enums.AdMediaType;

export const AdMediaType: typeof $Enums.AdMediaType;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffMember`: Exposes CRUD operations for the **StaffMember** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more StaffMembers
   * const staffMembers = await prisma.staffMember.findMany()
   * ```
   */
  get staffMember(): Prisma.StaffMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.manager`: Exposes CRUD operations for the **Manager** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Managers
   * const managers = await prisma.manager.findMany()
   * ```
   */
  get manager(): Prisma.ManagerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendanceRecord`: Exposes CRUD operations for the **AttendanceRecord** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more AttendanceRecords
   * const attendanceRecords = await prisma.attendanceRecord.findMany()
   * ```
   */
  get attendanceRecord(): Prisma.AttendanceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.managerAttendanceRecord`: Exposes CRUD operations for the **ManagerAttendanceRecord** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ManagerAttendanceRecords
   * const managerAttendanceRecords = await prisma.managerAttendanceRecord.findMany()
   * ```
   */
  get managerAttendanceRecord(): Prisma.ManagerAttendanceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventRecord`: Exposes CRUD operations for the **EventRecord** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more EventRecords
   * const eventRecords = await prisma.eventRecord.findMany()
   * ```
   */
  get eventRecord(): Prisma.EventRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meetingSchedule`: Exposes CRUD operations for the **MeetingSchedule** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more MeetingSchedules
   * const meetingSchedules = await prisma.meetingSchedule.findMany()
   * ```
   */
  get meetingSchedule(): Prisma.MeetingScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.advertisement`: Exposes CRUD operations for the **Advertisement** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Advertisements
   * const advertisements = await prisma.advertisement.findMany()
   * ```
   */
  get advertisement(): Prisma.AdvertisementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weatherSetting`: Exposes CRUD operations for the **WeatherSetting** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more WeatherSettings
   * const weatherSettings = await prisma.weatherSetting.findMany()
   * ```
   */
  get weatherSetting(): Prisma.WeatherSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movieSchedule`: Exposes CRUD operations for the **MovieSchedule** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more MovieSchedules
   * const movieSchedules = await prisma.movieSchedule.findMany()
   * ```
   */
  get movieSchedule(): Prisma.MovieScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemSalesTarget`: Exposes CRUD operations for the **ItemSalesTarget** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ItemSalesTargets
   * const itemSalesTargets = await prisma.itemSalesTarget.findMany()
   * ```
   */
  get itemSalesTarget(): Prisma.ItemSalesTargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.concessionPriceItem`: Exposes CRUD operations for the **ConcessionPriceItem** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ConcessionPriceItems
   * const concessionPriceItems = await prisma.concessionPriceItem.findMany()
   * ```
   */
  get concessionPriceItem(): Prisma.ConcessionPriceItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.displayPage`: Exposes CRUD operations for the **DisplayPage** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more DisplayPages
   * const displayPages = await prisma.displayPage.findMany()
   * ```
   */
  get displayPage(): Prisma.DisplayPageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more SystemSettings
   * const systemSettings = await prisma.systemSetting.findMany()
   * ```
   */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    StaffMember: 'StaffMember';
    Manager: 'Manager';
    AttendanceRecord: 'AttendanceRecord';
    ManagerAttendanceRecord: 'ManagerAttendanceRecord';
    EventRecord: 'EventRecord';
    MeetingSchedule: 'MeetingSchedule';
    Advertisement: 'Advertisement';
    WeatherSetting: 'WeatherSetting';
    MovieSchedule: 'MovieSchedule';
    ItemSalesTarget: 'ItemSalesTarget';
    ConcessionPriceItem: 'ConcessionPriceItem';
    DisplayPage: 'DisplayPage';
    SystemSetting: 'SystemSetting';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'user'
        | 'staffMember'
        | 'manager'
        | 'attendanceRecord'
        | 'managerAttendanceRecord'
        | 'eventRecord'
        | 'meetingSchedule'
        | 'advertisement'
        | 'weatherSetting'
        | 'movieSchedule'
        | 'itemSalesTarget'
        | 'concessionPriceItem'
        | 'displayPage'
        | 'systemSetting';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      StaffMember: {
        payload: Prisma.$StaffMemberPayload<ExtArgs>;
        fields: Prisma.StaffMemberFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.StaffMemberFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.StaffMemberFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>;
          };
          findFirst: {
            args: Prisma.StaffMemberFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.StaffMemberFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>;
          };
          findMany: {
            args: Prisma.StaffMemberFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>[];
          };
          create: {
            args: Prisma.StaffMemberCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>;
          };
          createMany: {
            args: Prisma.StaffMemberCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.StaffMemberCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>[];
          };
          delete: {
            args: Prisma.StaffMemberDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>;
          };
          update: {
            args: Prisma.StaffMemberUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>;
          };
          deleteMany: {
            args: Prisma.StaffMemberDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.StaffMemberUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.StaffMemberUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>[];
          };
          upsert: {
            args: Prisma.StaffMemberUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StaffMemberPayload>;
          };
          aggregate: {
            args: Prisma.StaffMemberAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateStaffMember>;
          };
          groupBy: {
            args: Prisma.StaffMemberGroupByArgs<ExtArgs>;
            result: $Utils.Optional<StaffMemberGroupByOutputType>[];
          };
          count: {
            args: Prisma.StaffMemberCountArgs<ExtArgs>;
            result: $Utils.Optional<StaffMemberCountAggregateOutputType> | number;
          };
        };
      };
      Manager: {
        payload: Prisma.$ManagerPayload<ExtArgs>;
        fields: Prisma.ManagerFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ManagerFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ManagerFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          findFirst: {
            args: Prisma.ManagerFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ManagerFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          findMany: {
            args: Prisma.ManagerFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[];
          };
          create: {
            args: Prisma.ManagerCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          createMany: {
            args: Prisma.ManagerCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ManagerCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[];
          };
          delete: {
            args: Prisma.ManagerDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          update: {
            args: Prisma.ManagerUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          deleteMany: {
            args: Prisma.ManagerDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ManagerUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ManagerUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[];
          };
          upsert: {
            args: Prisma.ManagerUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>;
          };
          aggregate: {
            args: Prisma.ManagerAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateManager>;
          };
          groupBy: {
            args: Prisma.ManagerGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ManagerGroupByOutputType>[];
          };
          count: {
            args: Prisma.ManagerCountArgs<ExtArgs>;
            result: $Utils.Optional<ManagerCountAggregateOutputType> | number;
          };
        };
      };
      AttendanceRecord: {
        payload: Prisma.$AttendanceRecordPayload<ExtArgs>;
        fields: Prisma.AttendanceRecordFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AttendanceRecordFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
          };
          findFirst: {
            args: Prisma.AttendanceRecordFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AttendanceRecordFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
          };
          findMany: {
            args: Prisma.AttendanceRecordFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[];
          };
          create: {
            args: Prisma.AttendanceRecordCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
          };
          createMany: {
            args: Prisma.AttendanceRecordCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AttendanceRecordCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[];
          };
          delete: {
            args: Prisma.AttendanceRecordDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
          };
          update: {
            args: Prisma.AttendanceRecordUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
          };
          deleteMany: {
            args: Prisma.AttendanceRecordDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AttendanceRecordUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>[];
          };
          upsert: {
            args: Prisma.AttendanceRecordUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AttendanceRecordPayload>;
          };
          aggregate: {
            args: Prisma.AttendanceRecordAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAttendanceRecord>;
          };
          groupBy: {
            args: Prisma.AttendanceRecordGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AttendanceRecordGroupByOutputType>[];
          };
          count: {
            args: Prisma.AttendanceRecordCountArgs<ExtArgs>;
            result: $Utils.Optional<AttendanceRecordCountAggregateOutputType> | number;
          };
        };
      };
      ManagerAttendanceRecord: {
        payload: Prisma.$ManagerAttendanceRecordPayload<ExtArgs>;
        fields: Prisma.ManagerAttendanceRecordFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ManagerAttendanceRecordFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ManagerAttendanceRecordFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>;
          };
          findFirst: {
            args: Prisma.ManagerAttendanceRecordFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ManagerAttendanceRecordFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>;
          };
          findMany: {
            args: Prisma.ManagerAttendanceRecordFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>[];
          };
          create: {
            args: Prisma.ManagerAttendanceRecordCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>;
          };
          createMany: {
            args: Prisma.ManagerAttendanceRecordCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ManagerAttendanceRecordCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>[];
          };
          delete: {
            args: Prisma.ManagerAttendanceRecordDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>;
          };
          update: {
            args: Prisma.ManagerAttendanceRecordUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>;
          };
          deleteMany: {
            args: Prisma.ManagerAttendanceRecordDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ManagerAttendanceRecordUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ManagerAttendanceRecordUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>[];
          };
          upsert: {
            args: Prisma.ManagerAttendanceRecordUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ManagerAttendanceRecordPayload>;
          };
          aggregate: {
            args: Prisma.ManagerAttendanceRecordAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateManagerAttendanceRecord>;
          };
          groupBy: {
            args: Prisma.ManagerAttendanceRecordGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ManagerAttendanceRecordGroupByOutputType>[];
          };
          count: {
            args: Prisma.ManagerAttendanceRecordCountArgs<ExtArgs>;
            result: $Utils.Optional<ManagerAttendanceRecordCountAggregateOutputType> | number;
          };
        };
      };
      EventRecord: {
        payload: Prisma.$EventRecordPayload<ExtArgs>;
        fields: Prisma.EventRecordFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.EventRecordFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.EventRecordFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>;
          };
          findFirst: {
            args: Prisma.EventRecordFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.EventRecordFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>;
          };
          findMany: {
            args: Prisma.EventRecordFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>[];
          };
          create: {
            args: Prisma.EventRecordCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>;
          };
          createMany: {
            args: Prisma.EventRecordCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.EventRecordCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>[];
          };
          delete: {
            args: Prisma.EventRecordDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>;
          };
          update: {
            args: Prisma.EventRecordUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>;
          };
          deleteMany: {
            args: Prisma.EventRecordDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.EventRecordUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.EventRecordUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>[];
          };
          upsert: {
            args: Prisma.EventRecordUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$EventRecordPayload>;
          };
          aggregate: {
            args: Prisma.EventRecordAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateEventRecord>;
          };
          groupBy: {
            args: Prisma.EventRecordGroupByArgs<ExtArgs>;
            result: $Utils.Optional<EventRecordGroupByOutputType>[];
          };
          count: {
            args: Prisma.EventRecordCountArgs<ExtArgs>;
            result: $Utils.Optional<EventRecordCountAggregateOutputType> | number;
          };
        };
      };
      MeetingSchedule: {
        payload: Prisma.$MeetingSchedulePayload<ExtArgs>;
        fields: Prisma.MeetingScheduleFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MeetingScheduleFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MeetingScheduleFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>;
          };
          findFirst: {
            args: Prisma.MeetingScheduleFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MeetingScheduleFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>;
          };
          findMany: {
            args: Prisma.MeetingScheduleFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>[];
          };
          create: {
            args: Prisma.MeetingScheduleCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>;
          };
          createMany: {
            args: Prisma.MeetingScheduleCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MeetingScheduleCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>[];
          };
          delete: {
            args: Prisma.MeetingScheduleDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>;
          };
          update: {
            args: Prisma.MeetingScheduleUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>;
          };
          deleteMany: {
            args: Prisma.MeetingScheduleDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MeetingScheduleUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MeetingScheduleUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>[];
          };
          upsert: {
            args: Prisma.MeetingScheduleUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MeetingSchedulePayload>;
          };
          aggregate: {
            args: Prisma.MeetingScheduleAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMeetingSchedule>;
          };
          groupBy: {
            args: Prisma.MeetingScheduleGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MeetingScheduleGroupByOutputType>[];
          };
          count: {
            args: Prisma.MeetingScheduleCountArgs<ExtArgs>;
            result: $Utils.Optional<MeetingScheduleCountAggregateOutputType> | number;
          };
        };
      };
      Advertisement: {
        payload: Prisma.$AdvertisementPayload<ExtArgs>;
        fields: Prisma.AdvertisementFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AdvertisementFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AdvertisementFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>;
          };
          findFirst: {
            args: Prisma.AdvertisementFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AdvertisementFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>;
          };
          findMany: {
            args: Prisma.AdvertisementFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>[];
          };
          create: {
            args: Prisma.AdvertisementCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>;
          };
          createMany: {
            args: Prisma.AdvertisementCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AdvertisementCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>[];
          };
          delete: {
            args: Prisma.AdvertisementDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>;
          };
          update: {
            args: Prisma.AdvertisementUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>;
          };
          deleteMany: {
            args: Prisma.AdvertisementDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AdvertisementUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AdvertisementUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>[];
          };
          upsert: {
            args: Prisma.AdvertisementUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdvertisementPayload>;
          };
          aggregate: {
            args: Prisma.AdvertisementAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAdvertisement>;
          };
          groupBy: {
            args: Prisma.AdvertisementGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AdvertisementGroupByOutputType>[];
          };
          count: {
            args: Prisma.AdvertisementCountArgs<ExtArgs>;
            result: $Utils.Optional<AdvertisementCountAggregateOutputType> | number;
          };
        };
      };
      WeatherSetting: {
        payload: Prisma.$WeatherSettingPayload<ExtArgs>;
        fields: Prisma.WeatherSettingFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WeatherSettingFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WeatherSettingFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>;
          };
          findFirst: {
            args: Prisma.WeatherSettingFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WeatherSettingFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>;
          };
          findMany: {
            args: Prisma.WeatherSettingFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>[];
          };
          create: {
            args: Prisma.WeatherSettingCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>;
          };
          createMany: {
            args: Prisma.WeatherSettingCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WeatherSettingCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>[];
          };
          delete: {
            args: Prisma.WeatherSettingDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>;
          };
          update: {
            args: Prisma.WeatherSettingUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>;
          };
          deleteMany: {
            args: Prisma.WeatherSettingDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WeatherSettingUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.WeatherSettingUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>[];
          };
          upsert: {
            args: Prisma.WeatherSettingUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WeatherSettingPayload>;
          };
          aggregate: {
            args: Prisma.WeatherSettingAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWeatherSetting>;
          };
          groupBy: {
            args: Prisma.WeatherSettingGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WeatherSettingGroupByOutputType>[];
          };
          count: {
            args: Prisma.WeatherSettingCountArgs<ExtArgs>;
            result: $Utils.Optional<WeatherSettingCountAggregateOutputType> | number;
          };
        };
      };
      MovieSchedule: {
        payload: Prisma.$MovieSchedulePayload<ExtArgs>;
        fields: Prisma.MovieScheduleFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MovieScheduleFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MovieScheduleFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>;
          };
          findFirst: {
            args: Prisma.MovieScheduleFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MovieScheduleFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>;
          };
          findMany: {
            args: Prisma.MovieScheduleFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>[];
          };
          create: {
            args: Prisma.MovieScheduleCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>;
          };
          createMany: {
            args: Prisma.MovieScheduleCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MovieScheduleCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>[];
          };
          delete: {
            args: Prisma.MovieScheduleDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>;
          };
          update: {
            args: Prisma.MovieScheduleUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>;
          };
          deleteMany: {
            args: Prisma.MovieScheduleDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MovieScheduleUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MovieScheduleUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>[];
          };
          upsert: {
            args: Prisma.MovieScheduleUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MovieSchedulePayload>;
          };
          aggregate: {
            args: Prisma.MovieScheduleAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMovieSchedule>;
          };
          groupBy: {
            args: Prisma.MovieScheduleGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MovieScheduleGroupByOutputType>[];
          };
          count: {
            args: Prisma.MovieScheduleCountArgs<ExtArgs>;
            result: $Utils.Optional<MovieScheduleCountAggregateOutputType> | number;
          };
        };
      };
      ItemSalesTarget: {
        payload: Prisma.$ItemSalesTargetPayload<ExtArgs>;
        fields: Prisma.ItemSalesTargetFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ItemSalesTargetFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ItemSalesTargetFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>;
          };
          findFirst: {
            args: Prisma.ItemSalesTargetFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ItemSalesTargetFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>;
          };
          findMany: {
            args: Prisma.ItemSalesTargetFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>[];
          };
          create: {
            args: Prisma.ItemSalesTargetCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>;
          };
          createMany: {
            args: Prisma.ItemSalesTargetCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ItemSalesTargetCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>[];
          };
          delete: {
            args: Prisma.ItemSalesTargetDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>;
          };
          update: {
            args: Prisma.ItemSalesTargetUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>;
          };
          deleteMany: {
            args: Prisma.ItemSalesTargetDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ItemSalesTargetUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ItemSalesTargetUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>[];
          };
          upsert: {
            args: Prisma.ItemSalesTargetUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ItemSalesTargetPayload>;
          };
          aggregate: {
            args: Prisma.ItemSalesTargetAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateItemSalesTarget>;
          };
          groupBy: {
            args: Prisma.ItemSalesTargetGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ItemSalesTargetGroupByOutputType>[];
          };
          count: {
            args: Prisma.ItemSalesTargetCountArgs<ExtArgs>;
            result: $Utils.Optional<ItemSalesTargetCountAggregateOutputType> | number;
          };
        };
      };
      ConcessionPriceItem: {
        payload: Prisma.$ConcessionPriceItemPayload<ExtArgs>;
        fields: Prisma.ConcessionPriceItemFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ConcessionPriceItemFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ConcessionPriceItemFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>;
          };
          findFirst: {
            args: Prisma.ConcessionPriceItemFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ConcessionPriceItemFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>;
          };
          findMany: {
            args: Prisma.ConcessionPriceItemFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>[];
          };
          create: {
            args: Prisma.ConcessionPriceItemCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>;
          };
          createMany: {
            args: Prisma.ConcessionPriceItemCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ConcessionPriceItemCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>[];
          };
          delete: {
            args: Prisma.ConcessionPriceItemDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>;
          };
          update: {
            args: Prisma.ConcessionPriceItemUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>;
          };
          deleteMany: {
            args: Prisma.ConcessionPriceItemDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ConcessionPriceItemUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ConcessionPriceItemUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>[];
          };
          upsert: {
            args: Prisma.ConcessionPriceItemUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ConcessionPriceItemPayload>;
          };
          aggregate: {
            args: Prisma.ConcessionPriceItemAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateConcessionPriceItem>;
          };
          groupBy: {
            args: Prisma.ConcessionPriceItemGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ConcessionPriceItemGroupByOutputType>[];
          };
          count: {
            args: Prisma.ConcessionPriceItemCountArgs<ExtArgs>;
            result: $Utils.Optional<ConcessionPriceItemCountAggregateOutputType> | number;
          };
        };
      };
      DisplayPage: {
        payload: Prisma.$DisplayPagePayload<ExtArgs>;
        fields: Prisma.DisplayPageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.DisplayPageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.DisplayPageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>;
          };
          findFirst: {
            args: Prisma.DisplayPageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.DisplayPageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>;
          };
          findMany: {
            args: Prisma.DisplayPageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>[];
          };
          create: {
            args: Prisma.DisplayPageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>;
          };
          createMany: {
            args: Prisma.DisplayPageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.DisplayPageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>[];
          };
          delete: {
            args: Prisma.DisplayPageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>;
          };
          update: {
            args: Prisma.DisplayPageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>;
          };
          deleteMany: {
            args: Prisma.DisplayPageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.DisplayPageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.DisplayPageUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>[];
          };
          upsert: {
            args: Prisma.DisplayPageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DisplayPagePayload>;
          };
          aggregate: {
            args: Prisma.DisplayPageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDisplayPage>;
          };
          groupBy: {
            args: Prisma.DisplayPageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DisplayPageGroupByOutputType>[];
          };
          count: {
            args: Prisma.DisplayPageCountArgs<ExtArgs>;
            result: $Utils.Optional<DisplayPageCountAggregateOutputType> | number;
          };
        };
      };
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>;
        fields: Prisma.SystemSettingFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
          };
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
          };
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
          };
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
          };
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
          };
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
          };
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
          };
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SystemSettingUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[];
          };
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>;
          };
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSystemSetting>;
          };
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SystemSettingGroupByOutputType>[];
          };
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>;
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    staffMember?: StaffMemberOmit;
    manager?: ManagerOmit;
    attendanceRecord?: AttendanceRecordOmit;
    managerAttendanceRecord?: ManagerAttendanceRecordOmit;
    eventRecord?: EventRecordOmit;
    meetingSchedule?: MeetingScheduleOmit;
    advertisement?: AdvertisementOmit;
    weatherSetting?: WeatherSettingOmit;
    movieSchedule?: MovieScheduleOmit;
    itemSalesTarget?: ItemSalesTargetOmit;
    concessionPriceItem?: ConcessionPriceItemOmit;
    displayPage?: DisplayPageOmit;
    systemSetting?: SystemSettingOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type StaffMemberCountOutputType
   */

  export type StaffMemberCountOutputType = {
    attendanceRecords: number;
  };

  export type StaffMemberCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    attendanceRecords?: boolean | StaffMemberCountOutputTypeCountAttendanceRecordsArgs;
  };

  // Custom InputTypes
  /**
   * StaffMemberCountOutputType without action
   */
  export type StaffMemberCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMemberCountOutputType
     */
    select?: StaffMemberCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * StaffMemberCountOutputType without action
   */
  export type StaffMemberCountOutputTypeCountAttendanceRecordsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: AttendanceRecordWhereInput;
  };

  /**
   * Count Type ManagerCountOutputType
   */

  export type ManagerCountOutputType = {
    attendanceRecords: number;
  };

  export type ManagerCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    attendanceRecords?: boolean | ManagerCountOutputTypeCountAttendanceRecordsArgs;
  };

  // Custom InputTypes
  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerCountOutputType
     */
    select?: ManagerCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountAttendanceRecordsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: ManagerAttendanceRecordWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    password: number;
    role: number;
    permissions: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    permissions?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    permissions: string[];
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        email?: boolean;
        password?: boolean;
        role?: boolean;
        permissions?: boolean;
        status?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      role?: boolean;
      permissions?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      password?: boolean;
      role?: boolean;
      permissions?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    permissions?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'name'
      | 'email'
      | 'password'
      | 'role'
      | 'permissions'
      | 'status'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['user']
    >;

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        permissions: string[];
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'updateManyAndReturn', GlobalOmitOptions>
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly password: FieldRef<'User', 'String'>;
    readonly role: FieldRef<'User', 'String'>;
    readonly permissions: FieldRef<'User', 'String[]'>;
    readonly status: FieldRef<'User', 'RecordStatus'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
       *
       * Filter by unique combinations of Users.
       */
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Omit specific fields from the User
       */
      omit?: UserOmit<ExtArgs> | null;
    };

  /**
   * Model StaffMember
   */

  export type AggregateStaffMember = {
    _count: StaffMemberCountAggregateOutputType | null;
    _min: StaffMemberMinAggregateOutputType | null;
    _max: StaffMemberMaxAggregateOutputType | null;
  };

  export type StaffMemberMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    designation: string | null;
    department: string | null;
    phone: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type StaffMemberMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    designation: string | null;
    department: string | null;
    phone: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type StaffMemberCountAggregateOutputType = {
    id: number;
    name: number;
    designation: number;
    department: number;
    phone: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type StaffMemberMinAggregateInputType = {
    id?: true;
    name?: true;
    designation?: true;
    department?: true;
    phone?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type StaffMemberMaxAggregateInputType = {
    id?: true;
    name?: true;
    designation?: true;
    department?: true;
    phone?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type StaffMemberCountAggregateInputType = {
    id?: true;
    name?: true;
    designation?: true;
    department?: true;
    phone?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type StaffMemberAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which StaffMember to aggregate.
     */
    where?: StaffMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StaffMembers to fetch.
     */
    orderBy?: StaffMemberOrderByWithRelationInput | StaffMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: StaffMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StaffMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StaffMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StaffMembers
     **/
    _count?: true | StaffMemberCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: StaffMemberMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: StaffMemberMaxAggregateInputType;
  };

  export type GetStaffMemberAggregateType<T extends StaffMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateStaffMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffMember[P]>
      : GetScalarType<T[P], AggregateStaffMember[P]>;
  };

  export type StaffMemberGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: StaffMemberWhereInput;
    orderBy?: StaffMemberOrderByWithAggregationInput | StaffMemberOrderByWithAggregationInput[];
    by: StaffMemberScalarFieldEnum[] | StaffMemberScalarFieldEnum;
    having?: StaffMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StaffMemberCountAggregateInputType | true;
    _min?: StaffMemberMinAggregateInputType;
    _max?: StaffMemberMaxAggregateInputType;
  };

  export type StaffMemberGroupByOutputType = {
    id: string;
    name: string;
    designation: string;
    department: string | null;
    phone: string | null;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: StaffMemberCountAggregateOutputType | null;
    _min: StaffMemberMinAggregateOutputType | null;
    _max: StaffMemberMaxAggregateOutputType | null;
  };

  type GetStaffMemberGroupByPayload<T extends StaffMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffMemberGroupByOutputType, T['by']> & {
        [P in keyof T & keyof StaffMemberGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], StaffMemberGroupByOutputType[P]>
          : GetScalarType<T[P], StaffMemberGroupByOutputType[P]>;
      }
    >
  >;

  export type StaffMemberSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      designation?: boolean;
      department?: boolean;
      phone?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      attendanceRecords?: boolean | StaffMember$attendanceRecordsArgs<ExtArgs>;
      _count?: boolean | StaffMemberCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['staffMember']
  >;

  export type StaffMemberSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      designation?: boolean;
      department?: boolean;
      phone?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['staffMember']
  >;

  export type StaffMemberSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      designation?: boolean;
      department?: boolean;
      phone?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['staffMember']
  >;

  export type StaffMemberSelectScalar = {
    id?: boolean;
    name?: boolean;
    designation?: boolean;
    department?: boolean;
    phone?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type StaffMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'name' | 'designation' | 'department' | 'phone' | 'status' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['staffMember']
    >;
  export type StaffMemberInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    attendanceRecords?: boolean | StaffMember$attendanceRecordsArgs<ExtArgs>;
    _count?: boolean | StaffMemberCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type StaffMemberIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};
  export type StaffMemberIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};

  export type $StaffMemberPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'StaffMember';
    objects: {
      attendanceRecords: Prisma.$AttendanceRecordPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        designation: string;
        department: string | null;
        phone: string | null;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['staffMember']
    >;
    composites: {};
  };

  type StaffMemberGetPayload<S extends boolean | null | undefined | StaffMemberDefaultArgs> =
    $Result.GetResult<Prisma.$StaffMemberPayload, S>;

  type StaffMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffMemberCountAggregateInputType | true;
    };

  export interface StaffMemberDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['StaffMember'];
      meta: { name: 'StaffMember' };
    };
    /**
     * Find zero or one StaffMember that matches the filter.
     * @param {StaffMemberFindUniqueArgs} args - Arguments to find a StaffMember
     * @example
     * // Get one StaffMember
     * const staffMember = await prisma.staffMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffMemberFindUniqueArgs>(
      args: SelectSubset<T, StaffMemberFindUniqueArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<
        Prisma.$StaffMemberPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one StaffMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffMemberFindUniqueOrThrowArgs} args - Arguments to find a StaffMember
     * @example
     * // Get one StaffMember
     * const staffMember = await prisma.staffMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffMemberFindUniqueOrThrowArgs>(
      args: SelectSubset<T, StaffMemberFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<
        Prisma.$StaffMemberPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first StaffMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberFindFirstArgs} args - Arguments to find a StaffMember
     * @example
     * // Get one StaffMember
     * const staffMember = await prisma.staffMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffMemberFindFirstArgs>(
      args?: SelectSubset<T, StaffMemberFindFirstArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<
        Prisma.$StaffMemberPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first StaffMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberFindFirstOrThrowArgs} args - Arguments to find a StaffMember
     * @example
     * // Get one StaffMember
     * const staffMember = await prisma.staffMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffMemberFindFirstOrThrowArgs>(
      args?: SelectSubset<T, StaffMemberFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<
        Prisma.$StaffMemberPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more StaffMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffMembers
     * const staffMembers = await prisma.staffMember.findMany()
     *
     * // Get first 10 StaffMembers
     * const staffMembers = await prisma.staffMember.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const staffMemberWithIdOnly = await prisma.staffMember.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StaffMemberFindManyArgs>(
      args?: SelectSubset<T, StaffMemberFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$StaffMemberPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a StaffMember.
     * @param {StaffMemberCreateArgs} args - Arguments to create a StaffMember.
     * @example
     * // Create one StaffMember
     * const StaffMember = await prisma.staffMember.create({
     *   data: {
     *     // ... data to create a StaffMember
     *   }
     * })
     *
     */
    create<T extends StaffMemberCreateArgs>(
      args: SelectSubset<T, StaffMemberCreateArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<Prisma.$StaffMemberPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many StaffMembers.
     * @param {StaffMemberCreateManyArgs} args - Arguments to create many StaffMembers.
     * @example
     * // Create many StaffMembers
     * const staffMember = await prisma.staffMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StaffMemberCreateManyArgs>(
      args?: SelectSubset<T, StaffMemberCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many StaffMembers and returns the data saved in the database.
     * @param {StaffMemberCreateManyAndReturnArgs} args - Arguments to create many StaffMembers.
     * @example
     * // Create many StaffMembers
     * const staffMember = await prisma.staffMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StaffMembers and only return the `id`
     * const staffMemberWithIdOnly = await prisma.staffMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StaffMemberCreateManyAndReturnArgs>(
      args?: SelectSubset<T, StaffMemberCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StaffMemberPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a StaffMember.
     * @param {StaffMemberDeleteArgs} args - Arguments to delete one StaffMember.
     * @example
     * // Delete one StaffMember
     * const StaffMember = await prisma.staffMember.delete({
     *   where: {
     *     // ... filter to delete one StaffMember
     *   }
     * })
     *
     */
    delete<T extends StaffMemberDeleteArgs>(
      args: SelectSubset<T, StaffMemberDeleteArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<Prisma.$StaffMemberPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one StaffMember.
     * @param {StaffMemberUpdateArgs} args - Arguments to update one StaffMember.
     * @example
     * // Update one StaffMember
     * const staffMember = await prisma.staffMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StaffMemberUpdateArgs>(
      args: SelectSubset<T, StaffMemberUpdateArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<Prisma.$StaffMemberPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more StaffMembers.
     * @param {StaffMemberDeleteManyArgs} args - Arguments to filter StaffMembers to delete.
     * @example
     * // Delete a few StaffMembers
     * const { count } = await prisma.staffMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StaffMemberDeleteManyArgs>(
      args?: SelectSubset<T, StaffMemberDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more StaffMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffMembers
     * const staffMember = await prisma.staffMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StaffMemberUpdateManyArgs>(
      args: SelectSubset<T, StaffMemberUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more StaffMembers and returns the data updated in the database.
     * @param {StaffMemberUpdateManyAndReturnArgs} args - Arguments to update many StaffMembers.
     * @example
     * // Update many StaffMembers
     * const staffMember = await prisma.staffMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StaffMembers and only return the `id`
     * const staffMemberWithIdOnly = await prisma.staffMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StaffMemberUpdateManyAndReturnArgs>(
      args: SelectSubset<T, StaffMemberUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StaffMemberPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one StaffMember.
     * @param {StaffMemberUpsertArgs} args - Arguments to update or create a StaffMember.
     * @example
     * // Update or create a StaffMember
     * const staffMember = await prisma.staffMember.upsert({
     *   create: {
     *     // ... data to create a StaffMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffMember we want to update
     *   }
     * })
     */
    upsert<T extends StaffMemberUpsertArgs>(
      args: SelectSubset<T, StaffMemberUpsertArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      $Result.GetResult<Prisma.$StaffMemberPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of StaffMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberCountArgs} args - Arguments to filter StaffMembers to count.
     * @example
     * // Count the number of StaffMembers
     * const count = await prisma.staffMember.count({
     *   where: {
     *     // ... the filter for the StaffMembers we want to count
     *   }
     * })
     **/
    count<T extends StaffMemberCountArgs>(
      args?: Subset<T, StaffMemberCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffMemberCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a StaffMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends StaffMemberAggregateArgs>(
      args: Subset<T, StaffMemberAggregateArgs>
    ): Prisma.PrismaPromise<GetStaffMemberAggregateType<T>>;

    /**
     * Group by StaffMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends StaffMemberGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffMemberGroupByArgs['orderBy'] }
        : { orderBy?: StaffMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, StaffMemberGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetStaffMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StaffMember model
     */
    readonly fields: StaffMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffMemberClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    attendanceRecords<T extends StaffMember$attendanceRecordsArgs<ExtArgs> = {}>(
      args?: Subset<T, StaffMember$attendanceRecordsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AttendanceRecordPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the StaffMember model
   */
  interface StaffMemberFieldRefs {
    readonly id: FieldRef<'StaffMember', 'String'>;
    readonly name: FieldRef<'StaffMember', 'String'>;
    readonly designation: FieldRef<'StaffMember', 'String'>;
    readonly department: FieldRef<'StaffMember', 'String'>;
    readonly phone: FieldRef<'StaffMember', 'String'>;
    readonly status: FieldRef<'StaffMember', 'RecordStatus'>;
    readonly createdAt: FieldRef<'StaffMember', 'DateTime'>;
    readonly updatedAt: FieldRef<'StaffMember', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * StaffMember findUnique
   */
  export type StaffMemberFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * Filter, which StaffMember to fetch.
     */
    where: StaffMemberWhereUniqueInput;
  };

  /**
   * StaffMember findUniqueOrThrow
   */
  export type StaffMemberFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * Filter, which StaffMember to fetch.
     */
    where: StaffMemberWhereUniqueInput;
  };

  /**
   * StaffMember findFirst
   */
  export type StaffMemberFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * Filter, which StaffMember to fetch.
     */
    where?: StaffMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StaffMembers to fetch.
     */
    orderBy?: StaffMemberOrderByWithRelationInput | StaffMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StaffMembers.
     */
    cursor?: StaffMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StaffMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StaffMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StaffMembers.
     */
    distinct?: StaffMemberScalarFieldEnum | StaffMemberScalarFieldEnum[];
  };

  /**
   * StaffMember findFirstOrThrow
   */
  export type StaffMemberFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * Filter, which StaffMember to fetch.
     */
    where?: StaffMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StaffMembers to fetch.
     */
    orderBy?: StaffMemberOrderByWithRelationInput | StaffMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StaffMembers.
     */
    cursor?: StaffMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StaffMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StaffMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StaffMembers.
     */
    distinct?: StaffMemberScalarFieldEnum | StaffMemberScalarFieldEnum[];
  };

  /**
   * StaffMember findMany
   */
  export type StaffMemberFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * Filter, which StaffMembers to fetch.
     */
    where?: StaffMemberWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StaffMembers to fetch.
     */
    orderBy?: StaffMemberOrderByWithRelationInput | StaffMemberOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StaffMembers.
     */
    cursor?: StaffMemberWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StaffMembers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StaffMembers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StaffMembers.
     */
    distinct?: StaffMemberScalarFieldEnum | StaffMemberScalarFieldEnum[];
  };

  /**
   * StaffMember create
   */
  export type StaffMemberCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * The data needed to create a StaffMember.
     */
    data: XOR<StaffMemberCreateInput, StaffMemberUncheckedCreateInput>;
  };

  /**
   * StaffMember createMany
   */
  export type StaffMemberCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many StaffMembers.
     */
    data: StaffMemberCreateManyInput | StaffMemberCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * StaffMember createManyAndReturn
   */
  export type StaffMemberCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * The data used to create many StaffMembers.
     */
    data: StaffMemberCreateManyInput | StaffMemberCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * StaffMember update
   */
  export type StaffMemberUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * The data needed to update a StaffMember.
     */
    data: XOR<StaffMemberUpdateInput, StaffMemberUncheckedUpdateInput>;
    /**
     * Choose, which StaffMember to update.
     */
    where: StaffMemberWhereUniqueInput;
  };

  /**
   * StaffMember updateMany
   */
  export type StaffMemberUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update StaffMembers.
     */
    data: XOR<StaffMemberUpdateManyMutationInput, StaffMemberUncheckedUpdateManyInput>;
    /**
     * Filter which StaffMembers to update
     */
    where?: StaffMemberWhereInput;
    /**
     * Limit how many StaffMembers to update.
     */
    limit?: number;
  };

  /**
   * StaffMember updateManyAndReturn
   */
  export type StaffMemberUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * The data used to update StaffMembers.
     */
    data: XOR<StaffMemberUpdateManyMutationInput, StaffMemberUncheckedUpdateManyInput>;
    /**
     * Filter which StaffMembers to update
     */
    where?: StaffMemberWhereInput;
    /**
     * Limit how many StaffMembers to update.
     */
    limit?: number;
  };

  /**
   * StaffMember upsert
   */
  export type StaffMemberUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * The filter to search for the StaffMember to update in case it exists.
     */
    where: StaffMemberWhereUniqueInput;
    /**
     * In case the StaffMember found by the `where` argument doesn't exist, create a new StaffMember with this data.
     */
    create: XOR<StaffMemberCreateInput, StaffMemberUncheckedCreateInput>;
    /**
     * In case the StaffMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffMemberUpdateInput, StaffMemberUncheckedUpdateInput>;
  };

  /**
   * StaffMember delete
   */
  export type StaffMemberDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
    /**
     * Filter which StaffMember to delete.
     */
    where: StaffMemberWhereUniqueInput;
  };

  /**
   * StaffMember deleteMany
   */
  export type StaffMemberDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which StaffMembers to delete
     */
    where?: StaffMemberWhereInput;
    /**
     * Limit how many StaffMembers to delete.
     */
    limit?: number;
  };

  /**
   * StaffMember.attendanceRecords
   */
  export type StaffMember$attendanceRecordsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    where?: AttendanceRecordWhereInput;
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[];
    cursor?: AttendanceRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[];
  };

  /**
   * StaffMember without action
   */
  export type StaffMemberDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the StaffMember
     */
    select?: StaffMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StaffMember
     */
    omit?: StaffMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffMemberInclude<ExtArgs> | null;
  };

  /**
   * Model Manager
   */

  export type AggregateManager = {
    _count: ManagerCountAggregateOutputType | null;
    _min: ManagerMinAggregateOutputType | null;
    _max: ManagerMaxAggregateOutputType | null;
  };

  export type ManagerMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    designation: string | null;
    phone: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ManagerMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    designation: string | null;
    phone: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ManagerCountAggregateOutputType = {
    id: number;
    name: number;
    designation: number;
    phone: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ManagerMinAggregateInputType = {
    id?: true;
    name?: true;
    designation?: true;
    phone?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ManagerMaxAggregateInputType = {
    id?: true;
    name?: true;
    designation?: true;
    phone?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ManagerCountAggregateInputType = {
    id?: true;
    name?: true;
    designation?: true;
    phone?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ManagerAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Manager to aggregate.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Managers
     **/
    _count?: true | ManagerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ManagerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ManagerMaxAggregateInputType;
  };

  export type GetManagerAggregateType<T extends ManagerAggregateArgs> = {
    [P in keyof T & keyof AggregateManager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManager[P]>
      : GetScalarType<T[P], AggregateManager[P]>;
  };

  export type ManagerGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: ManagerWhereInput;
    orderBy?: ManagerOrderByWithAggregationInput | ManagerOrderByWithAggregationInput[];
    by: ManagerScalarFieldEnum[] | ManagerScalarFieldEnum;
    having?: ManagerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ManagerCountAggregateInputType | true;
    _min?: ManagerMinAggregateInputType;
    _max?: ManagerMaxAggregateInputType;
  };

  export type ManagerGroupByOutputType = {
    id: string;
    name: string;
    designation: string | null;
    phone: string | null;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ManagerCountAggregateOutputType | null;
    _min: ManagerMinAggregateOutputType | null;
    _max: ManagerMaxAggregateOutputType | null;
  };

  type GetManagerGroupByPayload<T extends ManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManagerGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ManagerGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ManagerGroupByOutputType[P]>
          : GetScalarType<T[P], ManagerGroupByOutputType[P]>;
      }
    >
  >;

  export type ManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        name?: boolean;
        designation?: boolean;
        phone?: boolean;
        status?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        attendanceRecords?: boolean | Manager$attendanceRecordsArgs<ExtArgs>;
        _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['manager']
    >;

  export type ManagerSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      designation?: boolean;
      phone?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['manager']
  >;

  export type ManagerSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      designation?: boolean;
      phone?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['manager']
  >;

  export type ManagerSelectScalar = {
    id?: boolean;
    name?: boolean;
    designation?: boolean;
    phone?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ManagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'name' | 'designation' | 'phone' | 'status' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['manager']
    >;
  export type ManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendanceRecords?: boolean | Manager$attendanceRecordsArgs<ExtArgs>;
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ManagerIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};
  export type ManagerIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};

  export type $ManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Manager';
      objects: {
        attendanceRecords: Prisma.$ManagerAttendanceRecordPayload<ExtArgs>[];
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          name: string;
          designation: string | null;
          phone: string | null;
          status: $Enums.RecordStatus;
          createdAt: Date;
          updatedAt: Date;
        },
        ExtArgs['result']['manager']
      >;
      composites: {};
    };

  type ManagerGetPayload<S extends boolean | null | undefined | ManagerDefaultArgs> =
    $Result.GetResult<Prisma.$ManagerPayload, S>;

  type ManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    ManagerFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ManagerCountAggregateInputType | true;
  };

  export interface ManagerDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Manager']; meta: { name: 'Manager' } };
    /**
     * Find zero or one Manager that matches the filter.
     * @param {ManagerFindUniqueArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManagerFindUniqueArgs>(
      args: SelectSubset<T, ManagerFindUniqueArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'findUnique', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Manager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManagerFindUniqueOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManagerFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ManagerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'findUniqueOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Manager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManagerFindFirstArgs>(
      args?: SelectSubset<T, ManagerFindFirstArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'findFirst', GlobalOmitOptions> | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Manager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManagerFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManagerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'findFirstOrThrow', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Managers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Managers
     * const managers = await prisma.manager.findMany()
     *
     * // Get first 10 Managers
     * const managers = await prisma.manager.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const managerWithIdOnly = await prisma.manager.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ManagerFindManyArgs>(
      args?: SelectSubset<T, ManagerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Manager.
     * @param {ManagerCreateArgs} args - Arguments to create a Manager.
     * @example
     * // Create one Manager
     * const Manager = await prisma.manager.create({
     *   data: {
     *     // ... data to create a Manager
     *   }
     * })
     *
     */
    create<T extends ManagerCreateArgs>(
      args: SelectSubset<T, ManagerCreateArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Managers.
     * @param {ManagerCreateManyArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ManagerCreateManyArgs>(
      args?: SelectSubset<T, ManagerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Managers and returns the data saved in the database.
     * @param {ManagerCreateManyAndReturnArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ManagerCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ManagerCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ManagerPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Manager.
     * @param {ManagerDeleteArgs} args - Arguments to delete one Manager.
     * @example
     * // Delete one Manager
     * const Manager = await prisma.manager.delete({
     *   where: {
     *     // ... filter to delete one Manager
     *   }
     * })
     *
     */
    delete<T extends ManagerDeleteArgs>(
      args: SelectSubset<T, ManagerDeleteArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Manager.
     * @param {ManagerUpdateArgs} args - Arguments to update one Manager.
     * @example
     * // Update one Manager
     * const manager = await prisma.manager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ManagerUpdateArgs>(
      args: SelectSubset<T, ManagerUpdateArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Managers.
     * @param {ManagerDeleteManyArgs} args - Arguments to filter Managers to delete.
     * @example
     * // Delete a few Managers
     * const { count } = await prisma.manager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ManagerDeleteManyArgs>(
      args?: SelectSubset<T, ManagerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ManagerUpdateManyArgs>(
      args: SelectSubset<T, ManagerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Managers and returns the data updated in the database.
     * @param {ManagerUpdateManyAndReturnArgs} args - Arguments to update many Managers.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ManagerUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ManagerUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ManagerPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Manager.
     * @param {ManagerUpsertArgs} args - Arguments to update or create a Manager.
     * @example
     * // Update or create a Manager
     * const manager = await prisma.manager.upsert({
     *   create: {
     *     // ... data to create a Manager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Manager we want to update
     *   }
     * })
     */
    upsert<T extends ManagerUpsertArgs>(
      args: SelectSubset<T, ManagerUpsertArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      $Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerCountArgs} args - Arguments to filter Managers to count.
     * @example
     * // Count the number of Managers
     * const count = await prisma.manager.count({
     *   where: {
     *     // ... the filter for the Managers we want to count
     *   }
     * })
     **/
    count<T extends ManagerCountArgs>(
      args?: Subset<T, ManagerCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManagerCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ManagerAggregateArgs>(
      args: Subset<T, ManagerAggregateArgs>
    ): Prisma.PrismaPromise<GetManagerAggregateType<T>>;

    /**
     * Group by Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ManagerGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManagerGroupByArgs['orderBy'] }
        : { orderBy?: ManagerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, ManagerGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Manager model
     */
    readonly fields: ManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Manager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManagerClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    attendanceRecords<T extends Manager$attendanceRecordsArgs<ExtArgs> = {}>(
      args?: Subset<T, Manager$attendanceRecordsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Manager model
   */
  interface ManagerFieldRefs {
    readonly id: FieldRef<'Manager', 'String'>;
    readonly name: FieldRef<'Manager', 'String'>;
    readonly designation: FieldRef<'Manager', 'String'>;
    readonly phone: FieldRef<'Manager', 'String'>;
    readonly status: FieldRef<'Manager', 'RecordStatus'>;
    readonly createdAt: FieldRef<'Manager', 'DateTime'>;
    readonly updatedAt: FieldRef<'Manager', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Manager findUnique
   */
  export type ManagerFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager findUniqueOrThrow
   */
  export type ManagerFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager findFirst
   */
  export type ManagerFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[];
  };

  /**
   * Manager findFirstOrThrow
   */
  export type ManagerFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[];
  };

  /**
   * Manager findMany
   */
  export type ManagerFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter, which Managers to fetch.
     */
    where?: ManagerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Managers.
     */
    cursor?: ManagerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Managers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[];
  };

  /**
   * Manager create
   */
  export type ManagerCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * The data needed to create a Manager.
     */
    data: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>;
  };

  /**
   * Manager createMany
   */
  export type ManagerCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Manager createManyAndReturn
   */
  export type ManagerCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Manager update
   */
  export type ManagerUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * The data needed to update a Manager.
     */
    data: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>;
    /**
     * Choose, which Manager to update.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager updateMany
   */
  export type ManagerUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>;
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput;
    /**
     * Limit how many Managers to update.
     */
    limit?: number;
  };

  /**
   * Manager updateManyAndReturn
   */
  export type ManagerUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>;
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput;
    /**
     * Limit how many Managers to update.
     */
    limit?: number;
  };

  /**
   * Manager upsert
   */
  export type ManagerUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * The filter to search for the Manager to update in case it exists.
     */
    where: ManagerWhereUniqueInput;
    /**
     * In case the Manager found by the `where` argument doesn't exist, create a new Manager with this data.
     */
    create: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>;
    /**
     * In case the Manager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>;
  };

  /**
   * Manager delete
   */
  export type ManagerDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
    /**
     * Filter which Manager to delete.
     */
    where: ManagerWhereUniqueInput;
  };

  /**
   * Manager deleteMany
   */
  export type ManagerDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Managers to delete
     */
    where?: ManagerWhereInput;
    /**
     * Limit how many Managers to delete.
     */
    limit?: number;
  };

  /**
   * Manager.attendanceRecords
   */
  export type Manager$attendanceRecordsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    where?: ManagerAttendanceRecordWhereInput;
    orderBy?:
      | ManagerAttendanceRecordOrderByWithRelationInput
      | ManagerAttendanceRecordOrderByWithRelationInput[];
    cursor?: ManagerAttendanceRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ManagerAttendanceRecordScalarFieldEnum | ManagerAttendanceRecordScalarFieldEnum[];
  };

  /**
   * Manager without action
   */
  export type ManagerDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null;
  };

  /**
   * Model AttendanceRecord
   */

  export type AggregateAttendanceRecord = {
    _count: AttendanceRecordCountAggregateOutputType | null;
    _min: AttendanceRecordMinAggregateOutputType | null;
    _max: AttendanceRecordMaxAggregateOutputType | null;
  };

  export type AttendanceRecordMinAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    date: Date | null;
    shift: string | null;
    status: $Enums.AttendanceStatus | null;
    remarks: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AttendanceRecordMaxAggregateOutputType = {
    id: string | null;
    staffId: string | null;
    date: Date | null;
    shift: string | null;
    status: $Enums.AttendanceStatus | null;
    remarks: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AttendanceRecordCountAggregateOutputType = {
    id: number;
    staffId: number;
    date: number;
    shift: number;
    status: number;
    remarks: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AttendanceRecordMinAggregateInputType = {
    id?: true;
    staffId?: true;
    date?: true;
    shift?: true;
    status?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AttendanceRecordMaxAggregateInputType = {
    id?: true;
    staffId?: true;
    date?: true;
    shift?: true;
    status?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AttendanceRecordCountAggregateInputType = {
    id?: true;
    staffId?: true;
    date?: true;
    shift?: true;
    status?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AttendanceRecordAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which AttendanceRecord to aggregate.
     */
    where?: AttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AttendanceRecords
     **/
    _count?: true | AttendanceRecordCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AttendanceRecordMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AttendanceRecordMaxAggregateInputType;
  };

  export type GetAttendanceRecordAggregateType<T extends AttendanceRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateAttendanceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendanceRecord[P]>
      : GetScalarType<T[P], AggregateAttendanceRecord[P]>;
  };

  export type AttendanceRecordGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: AttendanceRecordWhereInput;
    orderBy?:
      | AttendanceRecordOrderByWithAggregationInput
      | AttendanceRecordOrderByWithAggregationInput[];
    by: AttendanceRecordScalarFieldEnum[] | AttendanceRecordScalarFieldEnum;
    having?: AttendanceRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttendanceRecordCountAggregateInputType | true;
    _min?: AttendanceRecordMinAggregateInputType;
    _max?: AttendanceRecordMaxAggregateInputType;
  };

  export type AttendanceRecordGroupByOutputType = {
    id: string;
    staffId: string;
    date: Date;
    shift: string | null;
    status: $Enums.AttendanceStatus;
    remarks: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AttendanceRecordCountAggregateOutputType | null;
    _min: AttendanceRecordMinAggregateOutputType | null;
    _max: AttendanceRecordMaxAggregateOutputType | null;
  };

  type GetAttendanceRecordGroupByPayload<T extends AttendanceRecordGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AttendanceRecordGroupByOutputType, T['by']> & {
          [P in keyof T & keyof AttendanceRecordGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceRecordGroupByOutputType[P]>;
        }
      >
    >;

  export type AttendanceRecordSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      staffId?: boolean;
      date?: boolean;
      shift?: boolean;
      status?: boolean;
      remarks?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      staff?: boolean | StaffMemberDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['attendanceRecord']
  >;

  export type AttendanceRecordSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      staffId?: boolean;
      date?: boolean;
      shift?: boolean;
      status?: boolean;
      remarks?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      staff?: boolean | StaffMemberDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['attendanceRecord']
  >;

  export type AttendanceRecordSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      staffId?: boolean;
      date?: boolean;
      shift?: boolean;
      status?: boolean;
      remarks?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      staff?: boolean | StaffMemberDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['attendanceRecord']
  >;

  export type AttendanceRecordSelectScalar = {
    id?: boolean;
    staffId?: boolean;
    date?: boolean;
    shift?: boolean;
    status?: boolean;
    remarks?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AttendanceRecordOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    'id' | 'staffId' | 'date' | 'shift' | 'status' | 'remarks' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['attendanceRecord']
  >;
  export type AttendanceRecordInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    staff?: boolean | StaffMemberDefaultArgs<ExtArgs>;
  };
  export type AttendanceRecordIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    staff?: boolean | StaffMemberDefaultArgs<ExtArgs>;
  };
  export type AttendanceRecordIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    staff?: boolean | StaffMemberDefaultArgs<ExtArgs>;
  };

  export type $AttendanceRecordPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'AttendanceRecord';
    objects: {
      staff: Prisma.$StaffMemberPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        staffId: string;
        date: Date;
        shift: string | null;
        status: $Enums.AttendanceStatus;
        remarks: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['attendanceRecord']
    >;
    composites: {};
  };

  type AttendanceRecordGetPayload<
    S extends boolean | null | undefined | AttendanceRecordDefaultArgs
  > = $Result.GetResult<Prisma.$AttendanceRecordPayload, S>;

  type AttendanceRecordCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<AttendanceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttendanceRecordCountAggregateInputType | true;
  };

  export interface AttendanceRecordDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['AttendanceRecord'];
      meta: { name: 'AttendanceRecord' };
    };
    /**
     * Find zero or one AttendanceRecord that matches the filter.
     * @param {AttendanceRecordFindUniqueArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceRecordFindUniqueArgs>(
      args: SelectSubset<T, AttendanceRecordFindUniqueArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<
        Prisma.$AttendanceRecordPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one AttendanceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceRecordFindUniqueOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceRecordFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AttendanceRecordFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<
        Prisma.$AttendanceRecordPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AttendanceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceRecordFindFirstArgs>(
      args?: SelectSubset<T, AttendanceRecordFindFirstArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<
        Prisma.$AttendanceRecordPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first AttendanceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindFirstOrThrowArgs} args - Arguments to find a AttendanceRecord
     * @example
     * // Get one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceRecordFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AttendanceRecordFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<
        Prisma.$AttendanceRecordPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more AttendanceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany()
     *
     * // Get first 10 AttendanceRecords
     * const attendanceRecords = await prisma.attendanceRecord.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AttendanceRecordFindManyArgs>(
      args?: SelectSubset<T, AttendanceRecordFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a AttendanceRecord.
     * @param {AttendanceRecordCreateArgs} args - Arguments to create a AttendanceRecord.
     * @example
     * // Create one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.create({
     *   data: {
     *     // ... data to create a AttendanceRecord
     *   }
     * })
     *
     */
    create<T extends AttendanceRecordCreateArgs>(
      args: SelectSubset<T, AttendanceRecordCreateArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many AttendanceRecords.
     * @param {AttendanceRecordCreateManyArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AttendanceRecordCreateManyArgs>(
      args?: SelectSubset<T, AttendanceRecordCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many AttendanceRecords and returns the data saved in the database.
     * @param {AttendanceRecordCreateManyAndReturnArgs} args - Arguments to create many AttendanceRecords.
     * @example
     * // Create many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AttendanceRecordCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AttendanceRecordCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AttendanceRecordPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a AttendanceRecord.
     * @param {AttendanceRecordDeleteArgs} args - Arguments to delete one AttendanceRecord.
     * @example
     * // Delete one AttendanceRecord
     * const AttendanceRecord = await prisma.attendanceRecord.delete({
     *   where: {
     *     // ... filter to delete one AttendanceRecord
     *   }
     * })
     *
     */
    delete<T extends AttendanceRecordDeleteArgs>(
      args: SelectSubset<T, AttendanceRecordDeleteArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one AttendanceRecord.
     * @param {AttendanceRecordUpdateArgs} args - Arguments to update one AttendanceRecord.
     * @example
     * // Update one AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AttendanceRecordUpdateArgs>(
      args: SelectSubset<T, AttendanceRecordUpdateArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more AttendanceRecords.
     * @param {AttendanceRecordDeleteManyArgs} args - Arguments to filter AttendanceRecords to delete.
     * @example
     * // Delete a few AttendanceRecords
     * const { count } = await prisma.attendanceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AttendanceRecordDeleteManyArgs>(
      args?: SelectSubset<T, AttendanceRecordDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AttendanceRecordUpdateManyArgs>(
      args: SelectSubset<T, AttendanceRecordUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more AttendanceRecords and returns the data updated in the database.
     * @param {AttendanceRecordUpdateManyAndReturnArgs} args - Arguments to update many AttendanceRecords.
     * @example
     * // Update many AttendanceRecords
     * const attendanceRecord = await prisma.attendanceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AttendanceRecords and only return the `id`
     * const attendanceRecordWithIdOnly = await prisma.attendanceRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AttendanceRecordUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AttendanceRecordUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AttendanceRecordPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one AttendanceRecord.
     * @param {AttendanceRecordUpsertArgs} args - Arguments to update or create a AttendanceRecord.
     * @example
     * // Update or create a AttendanceRecord
     * const attendanceRecord = await prisma.attendanceRecord.upsert({
     *   create: {
     *     // ... data to create a AttendanceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttendanceRecord we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceRecordUpsertArgs>(
      args: SelectSubset<T, AttendanceRecordUpsertArgs<ExtArgs>>
    ): Prisma__AttendanceRecordClient<
      $Result.GetResult<Prisma.$AttendanceRecordPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of AttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordCountArgs} args - Arguments to filter AttendanceRecords to count.
     * @example
     * // Count the number of AttendanceRecords
     * const count = await prisma.attendanceRecord.count({
     *   where: {
     *     // ... the filter for the AttendanceRecords we want to count
     *   }
     * })
     **/
    count<T extends AttendanceRecordCountArgs>(
      args?: Subset<T, AttendanceRecordCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceRecordCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AttendanceRecordAggregateArgs>(
      args: Subset<T, AttendanceRecordAggregateArgs>
    ): Prisma.PrismaPromise<GetAttendanceRecordAggregateType<T>>;

    /**
     * Group by AttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AttendanceRecordGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceRecordGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, AttendanceRecordGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetAttendanceRecordGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AttendanceRecord model
     */
    readonly fields: AttendanceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttendanceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceRecordClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    staff<T extends StaffMemberDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, StaffMemberDefaultArgs<ExtArgs>>
    ): Prisma__StaffMemberClient<
      | $Result.GetResult<
          Prisma.$StaffMemberPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the AttendanceRecord model
   */
  interface AttendanceRecordFieldRefs {
    readonly id: FieldRef<'AttendanceRecord', 'String'>;
    readonly staffId: FieldRef<'AttendanceRecord', 'String'>;
    readonly date: FieldRef<'AttendanceRecord', 'DateTime'>;
    readonly shift: FieldRef<'AttendanceRecord', 'String'>;
    readonly status: FieldRef<'AttendanceRecord', 'AttendanceStatus'>;
    readonly remarks: FieldRef<'AttendanceRecord', 'String'>;
    readonly createdAt: FieldRef<'AttendanceRecord', 'DateTime'>;
    readonly updatedAt: FieldRef<'AttendanceRecord', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * AttendanceRecord findUnique
   */
  export type AttendanceRecordFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput;
  };

  /**
   * AttendanceRecord findUniqueOrThrow
   */
  export type AttendanceRecordFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where: AttendanceRecordWhereUniqueInput;
  };

  /**
   * AttendanceRecord findFirst
   */
  export type AttendanceRecordFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[];
  };

  /**
   * AttendanceRecord findFirstOrThrow
   */
  export type AttendanceRecordFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which AttendanceRecord to fetch.
     */
    where?: AttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[];
  };

  /**
   * AttendanceRecord findMany
   */
  export type AttendanceRecordFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which AttendanceRecords to fetch.
     */
    where?: AttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AttendanceRecords to fetch.
     */
    orderBy?: AttendanceRecordOrderByWithRelationInput | AttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AttendanceRecords.
     */
    cursor?: AttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AttendanceRecords.
     */
    distinct?: AttendanceRecordScalarFieldEnum | AttendanceRecordScalarFieldEnum[];
  };

  /**
   * AttendanceRecord create
   */
  export type AttendanceRecordCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * The data needed to create a AttendanceRecord.
     */
    data: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>;
  };

  /**
   * AttendanceRecord createMany
   */
  export type AttendanceRecordCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * AttendanceRecord createManyAndReturn
   */
  export type AttendanceRecordCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * The data used to create many AttendanceRecords.
     */
    data: AttendanceRecordCreateManyInput | AttendanceRecordCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AttendanceRecord update
   */
  export type AttendanceRecordUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * The data needed to update a AttendanceRecord.
     */
    data: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>;
    /**
     * Choose, which AttendanceRecord to update.
     */
    where: AttendanceRecordWhereUniqueInput;
  };

  /**
   * AttendanceRecord updateMany
   */
  export type AttendanceRecordUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>;
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput;
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number;
  };

  /**
   * AttendanceRecord updateManyAndReturn
   */
  export type AttendanceRecordUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * The data used to update AttendanceRecords.
     */
    data: XOR<AttendanceRecordUpdateManyMutationInput, AttendanceRecordUncheckedUpdateManyInput>;
    /**
     * Filter which AttendanceRecords to update
     */
    where?: AttendanceRecordWhereInput;
    /**
     * Limit how many AttendanceRecords to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * AttendanceRecord upsert
   */
  export type AttendanceRecordUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * The filter to search for the AttendanceRecord to update in case it exists.
     */
    where: AttendanceRecordWhereUniqueInput;
    /**
     * In case the AttendanceRecord found by the `where` argument doesn't exist, create a new AttendanceRecord with this data.
     */
    create: XOR<AttendanceRecordCreateInput, AttendanceRecordUncheckedCreateInput>;
    /**
     * In case the AttendanceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceRecordUpdateInput, AttendanceRecordUncheckedUpdateInput>;
  };

  /**
   * AttendanceRecord delete
   */
  export type AttendanceRecordDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter which AttendanceRecord to delete.
     */
    where: AttendanceRecordWhereUniqueInput;
  };

  /**
   * AttendanceRecord deleteMany
   */
  export type AttendanceRecordDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which AttendanceRecords to delete
     */
    where?: AttendanceRecordWhereInput;
    /**
     * Limit how many AttendanceRecords to delete.
     */
    limit?: number;
  };

  /**
   * AttendanceRecord without action
   */
  export type AttendanceRecordDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the AttendanceRecord
     */
    select?: AttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AttendanceRecord
     */
    omit?: AttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceRecordInclude<ExtArgs> | null;
  };

  /**
   * Model ManagerAttendanceRecord
   */

  export type AggregateManagerAttendanceRecord = {
    _count: ManagerAttendanceRecordCountAggregateOutputType | null;
    _min: ManagerAttendanceRecordMinAggregateOutputType | null;
    _max: ManagerAttendanceRecordMaxAggregateOutputType | null;
  };

  export type ManagerAttendanceRecordMinAggregateOutputType = {
    id: string | null;
    managerId: string | null;
    date: Date | null;
    shift: string | null;
    status: $Enums.AttendanceStatus | null;
    remarks: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ManagerAttendanceRecordMaxAggregateOutputType = {
    id: string | null;
    managerId: string | null;
    date: Date | null;
    shift: string | null;
    status: $Enums.AttendanceStatus | null;
    remarks: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ManagerAttendanceRecordCountAggregateOutputType = {
    id: number;
    managerId: number;
    date: number;
    shift: number;
    status: number;
    remarks: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ManagerAttendanceRecordMinAggregateInputType = {
    id?: true;
    managerId?: true;
    date?: true;
    shift?: true;
    status?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ManagerAttendanceRecordMaxAggregateInputType = {
    id?: true;
    managerId?: true;
    date?: true;
    shift?: true;
    status?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ManagerAttendanceRecordCountAggregateInputType = {
    id?: true;
    managerId?: true;
    date?: true;
    shift?: true;
    status?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ManagerAttendanceRecordAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which ManagerAttendanceRecord to aggregate.
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ManagerAttendanceRecords to fetch.
     */
    orderBy?:
      | ManagerAttendanceRecordOrderByWithRelationInput
      | ManagerAttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ManagerAttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ManagerAttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ManagerAttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ManagerAttendanceRecords
     **/
    _count?: true | ManagerAttendanceRecordCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ManagerAttendanceRecordMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ManagerAttendanceRecordMaxAggregateInputType;
  };

  export type GetManagerAttendanceRecordAggregateType<
    T extends ManagerAttendanceRecordAggregateArgs
  > = {
    [P in keyof T & keyof AggregateManagerAttendanceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManagerAttendanceRecord[P]>
      : GetScalarType<T[P], AggregateManagerAttendanceRecord[P]>;
  };

  export type ManagerAttendanceRecordGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: ManagerAttendanceRecordWhereInput;
    orderBy?:
      | ManagerAttendanceRecordOrderByWithAggregationInput
      | ManagerAttendanceRecordOrderByWithAggregationInput[];
    by: ManagerAttendanceRecordScalarFieldEnum[] | ManagerAttendanceRecordScalarFieldEnum;
    having?: ManagerAttendanceRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ManagerAttendanceRecordCountAggregateInputType | true;
    _min?: ManagerAttendanceRecordMinAggregateInputType;
    _max?: ManagerAttendanceRecordMaxAggregateInputType;
  };

  export type ManagerAttendanceRecordGroupByOutputType = {
    id: string;
    managerId: string;
    date: Date;
    shift: string | null;
    status: $Enums.AttendanceStatus;
    remarks: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ManagerAttendanceRecordCountAggregateOutputType | null;
    _min: ManagerAttendanceRecordMinAggregateOutputType | null;
    _max: ManagerAttendanceRecordMaxAggregateOutputType | null;
  };

  type GetManagerAttendanceRecordGroupByPayload<T extends ManagerAttendanceRecordGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ManagerAttendanceRecordGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ManagerAttendanceRecordGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManagerAttendanceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], ManagerAttendanceRecordGroupByOutputType[P]>;
        }
      >
    >;

  export type ManagerAttendanceRecordSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      managerId?: boolean;
      date?: boolean;
      shift?: boolean;
      status?: boolean;
      remarks?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      manager?: boolean | ManagerDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['managerAttendanceRecord']
  >;

  export type ManagerAttendanceRecordSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      managerId?: boolean;
      date?: boolean;
      shift?: boolean;
      status?: boolean;
      remarks?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      manager?: boolean | ManagerDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['managerAttendanceRecord']
  >;

  export type ManagerAttendanceRecordSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      managerId?: boolean;
      date?: boolean;
      shift?: boolean;
      status?: boolean;
      remarks?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      manager?: boolean | ManagerDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['managerAttendanceRecord']
  >;

  export type ManagerAttendanceRecordSelectScalar = {
    id?: boolean;
    managerId?: boolean;
    date?: boolean;
    shift?: boolean;
    status?: boolean;
    remarks?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ManagerAttendanceRecordOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    'id' | 'managerId' | 'date' | 'shift' | 'status' | 'remarks' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['managerAttendanceRecord']
  >;
  export type ManagerAttendanceRecordInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    manager?: boolean | ManagerDefaultArgs<ExtArgs>;
  };
  export type ManagerAttendanceRecordIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    manager?: boolean | ManagerDefaultArgs<ExtArgs>;
  };
  export type ManagerAttendanceRecordIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    manager?: boolean | ManagerDefaultArgs<ExtArgs>;
  };

  export type $ManagerAttendanceRecordPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'ManagerAttendanceRecord';
    objects: {
      manager: Prisma.$ManagerPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        managerId: string;
        date: Date;
        shift: string | null;
        status: $Enums.AttendanceStatus;
        remarks: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['managerAttendanceRecord']
    >;
    composites: {};
  };

  type ManagerAttendanceRecordGetPayload<
    S extends boolean | null | undefined | ManagerAttendanceRecordDefaultArgs
  > = $Result.GetResult<Prisma.$ManagerAttendanceRecordPayload, S>;

  type ManagerAttendanceRecordCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<ManagerAttendanceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ManagerAttendanceRecordCountAggregateInputType | true;
  };

  export interface ManagerAttendanceRecordDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ManagerAttendanceRecord'];
      meta: { name: 'ManagerAttendanceRecord' };
    };
    /**
     * Find zero or one ManagerAttendanceRecord that matches the filter.
     * @param {ManagerAttendanceRecordFindUniqueArgs} args - Arguments to find a ManagerAttendanceRecord
     * @example
     * // Get one ManagerAttendanceRecord
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManagerAttendanceRecordFindUniqueArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordFindUniqueArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ManagerAttendanceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManagerAttendanceRecordFindUniqueOrThrowArgs} args - Arguments to find a ManagerAttendanceRecord
     * @example
     * // Get one ManagerAttendanceRecord
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManagerAttendanceRecordFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ManagerAttendanceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordFindFirstArgs} args - Arguments to find a ManagerAttendanceRecord
     * @example
     * // Get one ManagerAttendanceRecord
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManagerAttendanceRecordFindFirstArgs>(
      args?: SelectSubset<T, ManagerAttendanceRecordFindFirstArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ManagerAttendanceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordFindFirstOrThrowArgs} args - Arguments to find a ManagerAttendanceRecord
     * @example
     * // Get one ManagerAttendanceRecord
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManagerAttendanceRecordFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManagerAttendanceRecordFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ManagerAttendanceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManagerAttendanceRecords
     * const managerAttendanceRecords = await prisma.managerAttendanceRecord.findMany()
     *
     * // Get first 10 ManagerAttendanceRecords
     * const managerAttendanceRecords = await prisma.managerAttendanceRecord.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const managerAttendanceRecordWithIdOnly = await prisma.managerAttendanceRecord.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ManagerAttendanceRecordFindManyArgs>(
      args?: SelectSubset<T, ManagerAttendanceRecordFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ManagerAttendanceRecord.
     * @param {ManagerAttendanceRecordCreateArgs} args - Arguments to create a ManagerAttendanceRecord.
     * @example
     * // Create one ManagerAttendanceRecord
     * const ManagerAttendanceRecord = await prisma.managerAttendanceRecord.create({
     *   data: {
     *     // ... data to create a ManagerAttendanceRecord
     *   }
     * })
     *
     */
    create<T extends ManagerAttendanceRecordCreateArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordCreateArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ManagerAttendanceRecords.
     * @param {ManagerAttendanceRecordCreateManyArgs} args - Arguments to create many ManagerAttendanceRecords.
     * @example
     * // Create many ManagerAttendanceRecords
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ManagerAttendanceRecordCreateManyArgs>(
      args?: SelectSubset<T, ManagerAttendanceRecordCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ManagerAttendanceRecords and returns the data saved in the database.
     * @param {ManagerAttendanceRecordCreateManyAndReturnArgs} args - Arguments to create many ManagerAttendanceRecords.
     * @example
     * // Create many ManagerAttendanceRecords
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ManagerAttendanceRecords and only return the `id`
     * const managerAttendanceRecordWithIdOnly = await prisma.managerAttendanceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ManagerAttendanceRecordCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ManagerAttendanceRecordCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ManagerAttendanceRecord.
     * @param {ManagerAttendanceRecordDeleteArgs} args - Arguments to delete one ManagerAttendanceRecord.
     * @example
     * // Delete one ManagerAttendanceRecord
     * const ManagerAttendanceRecord = await prisma.managerAttendanceRecord.delete({
     *   where: {
     *     // ... filter to delete one ManagerAttendanceRecord
     *   }
     * })
     *
     */
    delete<T extends ManagerAttendanceRecordDeleteArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordDeleteArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ManagerAttendanceRecord.
     * @param {ManagerAttendanceRecordUpdateArgs} args - Arguments to update one ManagerAttendanceRecord.
     * @example
     * // Update one ManagerAttendanceRecord
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ManagerAttendanceRecordUpdateArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordUpdateArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ManagerAttendanceRecords.
     * @param {ManagerAttendanceRecordDeleteManyArgs} args - Arguments to filter ManagerAttendanceRecords to delete.
     * @example
     * // Delete a few ManagerAttendanceRecords
     * const { count } = await prisma.managerAttendanceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ManagerAttendanceRecordDeleteManyArgs>(
      args?: SelectSubset<T, ManagerAttendanceRecordDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ManagerAttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManagerAttendanceRecords
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ManagerAttendanceRecordUpdateManyArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ManagerAttendanceRecords and returns the data updated in the database.
     * @param {ManagerAttendanceRecordUpdateManyAndReturnArgs} args - Arguments to update many ManagerAttendanceRecords.
     * @example
     * // Update many ManagerAttendanceRecords
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ManagerAttendanceRecords and only return the `id`
     * const managerAttendanceRecordWithIdOnly = await prisma.managerAttendanceRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ManagerAttendanceRecordUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ManagerAttendanceRecord.
     * @param {ManagerAttendanceRecordUpsertArgs} args - Arguments to update or create a ManagerAttendanceRecord.
     * @example
     * // Update or create a ManagerAttendanceRecord
     * const managerAttendanceRecord = await prisma.managerAttendanceRecord.upsert({
     *   create: {
     *     // ... data to create a ManagerAttendanceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManagerAttendanceRecord we want to update
     *   }
     * })
     */
    upsert<T extends ManagerAttendanceRecordUpsertArgs>(
      args: SelectSubset<T, ManagerAttendanceRecordUpsertArgs<ExtArgs>>
    ): Prisma__ManagerAttendanceRecordClient<
      $Result.GetResult<
        Prisma.$ManagerAttendanceRecordPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ManagerAttendanceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordCountArgs} args - Arguments to filter ManagerAttendanceRecords to count.
     * @example
     * // Count the number of ManagerAttendanceRecords
     * const count = await prisma.managerAttendanceRecord.count({
     *   where: {
     *     // ... the filter for the ManagerAttendanceRecords we want to count
     *   }
     * })
     **/
    count<T extends ManagerAttendanceRecordCountArgs>(
      args?: Subset<T, ManagerAttendanceRecordCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManagerAttendanceRecordCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ManagerAttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ManagerAttendanceRecordAggregateArgs>(
      args: Subset<T, ManagerAttendanceRecordAggregateArgs>
    ): Prisma.PrismaPromise<GetManagerAttendanceRecordAggregateType<T>>;

    /**
     * Group by ManagerAttendanceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAttendanceRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ManagerAttendanceRecordGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManagerAttendanceRecordGroupByArgs['orderBy'] }
        : { orderBy?: ManagerAttendanceRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, ManagerAttendanceRecordGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetManagerAttendanceRecordGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ManagerAttendanceRecord model
     */
    readonly fields: ManagerAttendanceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ManagerAttendanceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManagerAttendanceRecordClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    manager<T extends ManagerDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ManagerDefaultArgs<ExtArgs>>
    ): Prisma__ManagerClient<
      | $Result.GetResult<
          Prisma.$ManagerPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ManagerAttendanceRecord model
   */
  interface ManagerAttendanceRecordFieldRefs {
    readonly id: FieldRef<'ManagerAttendanceRecord', 'String'>;
    readonly managerId: FieldRef<'ManagerAttendanceRecord', 'String'>;
    readonly date: FieldRef<'ManagerAttendanceRecord', 'DateTime'>;
    readonly shift: FieldRef<'ManagerAttendanceRecord', 'String'>;
    readonly status: FieldRef<'ManagerAttendanceRecord', 'AttendanceStatus'>;
    readonly remarks: FieldRef<'ManagerAttendanceRecord', 'String'>;
    readonly createdAt: FieldRef<'ManagerAttendanceRecord', 'DateTime'>;
    readonly updatedAt: FieldRef<'ManagerAttendanceRecord', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ManagerAttendanceRecord findUnique
   */
  export type ManagerAttendanceRecordFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which ManagerAttendanceRecord to fetch.
     */
    where: ManagerAttendanceRecordWhereUniqueInput;
  };

  /**
   * ManagerAttendanceRecord findUniqueOrThrow
   */
  export type ManagerAttendanceRecordFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which ManagerAttendanceRecord to fetch.
     */
    where: ManagerAttendanceRecordWhereUniqueInput;
  };

  /**
   * ManagerAttendanceRecord findFirst
   */
  export type ManagerAttendanceRecordFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which ManagerAttendanceRecord to fetch.
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ManagerAttendanceRecords to fetch.
     */
    orderBy?:
      | ManagerAttendanceRecordOrderByWithRelationInput
      | ManagerAttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ManagerAttendanceRecords.
     */
    cursor?: ManagerAttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ManagerAttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ManagerAttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ManagerAttendanceRecords.
     */
    distinct?: ManagerAttendanceRecordScalarFieldEnum | ManagerAttendanceRecordScalarFieldEnum[];
  };

  /**
   * ManagerAttendanceRecord findFirstOrThrow
   */
  export type ManagerAttendanceRecordFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which ManagerAttendanceRecord to fetch.
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ManagerAttendanceRecords to fetch.
     */
    orderBy?:
      | ManagerAttendanceRecordOrderByWithRelationInput
      | ManagerAttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ManagerAttendanceRecords.
     */
    cursor?: ManagerAttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ManagerAttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ManagerAttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ManagerAttendanceRecords.
     */
    distinct?: ManagerAttendanceRecordScalarFieldEnum | ManagerAttendanceRecordScalarFieldEnum[];
  };

  /**
   * ManagerAttendanceRecord findMany
   */
  export type ManagerAttendanceRecordFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter, which ManagerAttendanceRecords to fetch.
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ManagerAttendanceRecords to fetch.
     */
    orderBy?:
      | ManagerAttendanceRecordOrderByWithRelationInput
      | ManagerAttendanceRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ManagerAttendanceRecords.
     */
    cursor?: ManagerAttendanceRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ManagerAttendanceRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ManagerAttendanceRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ManagerAttendanceRecords.
     */
    distinct?: ManagerAttendanceRecordScalarFieldEnum | ManagerAttendanceRecordScalarFieldEnum[];
  };

  /**
   * ManagerAttendanceRecord create
   */
  export type ManagerAttendanceRecordCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * The data needed to create a ManagerAttendanceRecord.
     */
    data: XOR<ManagerAttendanceRecordCreateInput, ManagerAttendanceRecordUncheckedCreateInput>;
  };

  /**
   * ManagerAttendanceRecord createMany
   */
  export type ManagerAttendanceRecordCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many ManagerAttendanceRecords.
     */
    data: ManagerAttendanceRecordCreateManyInput | ManagerAttendanceRecordCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ManagerAttendanceRecord createManyAndReturn
   */
  export type ManagerAttendanceRecordCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * The data used to create many ManagerAttendanceRecords.
     */
    data: ManagerAttendanceRecordCreateManyInput | ManagerAttendanceRecordCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ManagerAttendanceRecord update
   */
  export type ManagerAttendanceRecordUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * The data needed to update a ManagerAttendanceRecord.
     */
    data: XOR<ManagerAttendanceRecordUpdateInput, ManagerAttendanceRecordUncheckedUpdateInput>;
    /**
     * Choose, which ManagerAttendanceRecord to update.
     */
    where: ManagerAttendanceRecordWhereUniqueInput;
  };

  /**
   * ManagerAttendanceRecord updateMany
   */
  export type ManagerAttendanceRecordUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update ManagerAttendanceRecords.
     */
    data: XOR<
      ManagerAttendanceRecordUpdateManyMutationInput,
      ManagerAttendanceRecordUncheckedUpdateManyInput
    >;
    /**
     * Filter which ManagerAttendanceRecords to update
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * Limit how many ManagerAttendanceRecords to update.
     */
    limit?: number;
  };

  /**
   * ManagerAttendanceRecord updateManyAndReturn
   */
  export type ManagerAttendanceRecordUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * The data used to update ManagerAttendanceRecords.
     */
    data: XOR<
      ManagerAttendanceRecordUpdateManyMutationInput,
      ManagerAttendanceRecordUncheckedUpdateManyInput
    >;
    /**
     * Filter which ManagerAttendanceRecords to update
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * Limit how many ManagerAttendanceRecords to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ManagerAttendanceRecord upsert
   */
  export type ManagerAttendanceRecordUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * The filter to search for the ManagerAttendanceRecord to update in case it exists.
     */
    where: ManagerAttendanceRecordWhereUniqueInput;
    /**
     * In case the ManagerAttendanceRecord found by the `where` argument doesn't exist, create a new ManagerAttendanceRecord with this data.
     */
    create: XOR<ManagerAttendanceRecordCreateInput, ManagerAttendanceRecordUncheckedCreateInput>;
    /**
     * In case the ManagerAttendanceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManagerAttendanceRecordUpdateInput, ManagerAttendanceRecordUncheckedUpdateInput>;
  };

  /**
   * ManagerAttendanceRecord delete
   */
  export type ManagerAttendanceRecordDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
    /**
     * Filter which ManagerAttendanceRecord to delete.
     */
    where: ManagerAttendanceRecordWhereUniqueInput;
  };

  /**
   * ManagerAttendanceRecord deleteMany
   */
  export type ManagerAttendanceRecordDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which ManagerAttendanceRecords to delete
     */
    where?: ManagerAttendanceRecordWhereInput;
    /**
     * Limit how many ManagerAttendanceRecords to delete.
     */
    limit?: number;
  };

  /**
   * ManagerAttendanceRecord without action
   */
  export type ManagerAttendanceRecordDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ManagerAttendanceRecord
     */
    select?: ManagerAttendanceRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ManagerAttendanceRecord
     */
    omit?: ManagerAttendanceRecordOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerAttendanceRecordInclude<ExtArgs> | null;
  };

  /**
   * Model EventRecord
   */

  export type AggregateEventRecord = {
    _count: EventRecordCountAggregateOutputType | null;
    _min: EventRecordMinAggregateOutputType | null;
    _max: EventRecordMaxAggregateOutputType | null;
  };

  export type EventRecordMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    clientName: string | null;
    companyName: string | null;
    screenName: string | null;
    startAt: Date | null;
    endAt: Date | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EventRecordMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    clientName: string | null;
    companyName: string | null;
    screenName: string | null;
    startAt: Date | null;
    endAt: Date | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type EventRecordCountAggregateOutputType = {
    id: number;
    title: number;
    clientName: number;
    companyName: number;
    screenName: number;
    startAt: number;
    endAt: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type EventRecordMinAggregateInputType = {
    id?: true;
    title?: true;
    clientName?: true;
    companyName?: true;
    screenName?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EventRecordMaxAggregateInputType = {
    id?: true;
    title?: true;
    clientName?: true;
    companyName?: true;
    screenName?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type EventRecordCountAggregateInputType = {
    id?: true;
    title?: true;
    clientName?: true;
    companyName?: true;
    screenName?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type EventRecordAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which EventRecord to aggregate.
     */
    where?: EventRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventRecords to fetch.
     */
    orderBy?: EventRecordOrderByWithRelationInput | EventRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: EventRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned EventRecords
     **/
    _count?: true | EventRecordCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: EventRecordMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: EventRecordMaxAggregateInputType;
  };

  export type GetEventRecordAggregateType<T extends EventRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateEventRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventRecord[P]>
      : GetScalarType<T[P], AggregateEventRecord[P]>;
  };

  export type EventRecordGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: EventRecordWhereInput;
    orderBy?: EventRecordOrderByWithAggregationInput | EventRecordOrderByWithAggregationInput[];
    by: EventRecordScalarFieldEnum[] | EventRecordScalarFieldEnum;
    having?: EventRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventRecordCountAggregateInputType | true;
    _min?: EventRecordMinAggregateInputType;
    _max?: EventRecordMaxAggregateInputType;
  };

  export type EventRecordGroupByOutputType = {
    id: string;
    title: string;
    clientName: string | null;
    companyName: string | null;
    screenName: string | null;
    startAt: Date;
    endAt: Date | null;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: EventRecordCountAggregateOutputType | null;
    _min: EventRecordMinAggregateOutputType | null;
    _max: EventRecordMaxAggregateOutputType | null;
  };

  type GetEventRecordGroupByPayload<T extends EventRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventRecordGroupByOutputType, T['by']> & {
        [P in keyof T & keyof EventRecordGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], EventRecordGroupByOutputType[P]>
          : GetScalarType<T[P], EventRecordGroupByOutputType[P]>;
      }
    >
  >;

  export type EventRecordSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      clientName?: boolean;
      companyName?: boolean;
      screenName?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['eventRecord']
  >;

  export type EventRecordSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      clientName?: boolean;
      companyName?: boolean;
      screenName?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['eventRecord']
  >;

  export type EventRecordSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      clientName?: boolean;
      companyName?: boolean;
      screenName?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['eventRecord']
  >;

  export type EventRecordSelectScalar = {
    id?: boolean;
    title?: boolean;
    clientName?: boolean;
    companyName?: boolean;
    screenName?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type EventRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      | 'id'
      | 'title'
      | 'clientName'
      | 'companyName'
      | 'screenName'
      | 'startAt'
      | 'endAt'
      | 'status'
      | 'createdAt'
      | 'updatedAt',
      ExtArgs['result']['eventRecord']
    >;

  export type $EventRecordPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'EventRecord';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        clientName: string | null;
        companyName: string | null;
        screenName: string | null;
        startAt: Date;
        endAt: Date | null;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['eventRecord']
    >;
    composites: {};
  };

  type EventRecordGetPayload<S extends boolean | null | undefined | EventRecordDefaultArgs> =
    $Result.GetResult<Prisma.$EventRecordPayload, S>;

  type EventRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventRecordCountAggregateInputType | true;
    };

  export interface EventRecordDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['EventRecord'];
      meta: { name: 'EventRecord' };
    };
    /**
     * Find zero or one EventRecord that matches the filter.
     * @param {EventRecordFindUniqueArgs} args - Arguments to find a EventRecord
     * @example
     * // Get one EventRecord
     * const eventRecord = await prisma.eventRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventRecordFindUniqueArgs>(
      args: SelectSubset<T, EventRecordFindUniqueArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<
        Prisma.$EventRecordPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one EventRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventRecordFindUniqueOrThrowArgs} args - Arguments to find a EventRecord
     * @example
     * // Get one EventRecord
     * const eventRecord = await prisma.eventRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventRecordFindUniqueOrThrowArgs>(
      args: SelectSubset<T, EventRecordFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<
        Prisma.$EventRecordPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first EventRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordFindFirstArgs} args - Arguments to find a EventRecord
     * @example
     * // Get one EventRecord
     * const eventRecord = await prisma.eventRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventRecordFindFirstArgs>(
      args?: SelectSubset<T, EventRecordFindFirstArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<
        Prisma.$EventRecordPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first EventRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordFindFirstOrThrowArgs} args - Arguments to find a EventRecord
     * @example
     * // Get one EventRecord
     * const eventRecord = await prisma.eventRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventRecordFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EventRecordFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<
        Prisma.$EventRecordPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more EventRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventRecords
     * const eventRecords = await prisma.eventRecord.findMany()
     *
     * // Get first 10 EventRecords
     * const eventRecords = await prisma.eventRecord.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const eventRecordWithIdOnly = await prisma.eventRecord.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EventRecordFindManyArgs>(
      args?: SelectSubset<T, EventRecordFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$EventRecordPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a EventRecord.
     * @param {EventRecordCreateArgs} args - Arguments to create a EventRecord.
     * @example
     * // Create one EventRecord
     * const EventRecord = await prisma.eventRecord.create({
     *   data: {
     *     // ... data to create a EventRecord
     *   }
     * })
     *
     */
    create<T extends EventRecordCreateArgs>(
      args: SelectSubset<T, EventRecordCreateArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<Prisma.$EventRecordPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many EventRecords.
     * @param {EventRecordCreateManyArgs} args - Arguments to create many EventRecords.
     * @example
     * // Create many EventRecords
     * const eventRecord = await prisma.eventRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EventRecordCreateManyArgs>(
      args?: SelectSubset<T, EventRecordCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many EventRecords and returns the data saved in the database.
     * @param {EventRecordCreateManyAndReturnArgs} args - Arguments to create many EventRecords.
     * @example
     * // Create many EventRecords
     * const eventRecord = await prisma.eventRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many EventRecords and only return the `id`
     * const eventRecordWithIdOnly = await prisma.eventRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EventRecordCreateManyAndReturnArgs>(
      args?: SelectSubset<T, EventRecordCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$EventRecordPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a EventRecord.
     * @param {EventRecordDeleteArgs} args - Arguments to delete one EventRecord.
     * @example
     * // Delete one EventRecord
     * const EventRecord = await prisma.eventRecord.delete({
     *   where: {
     *     // ... filter to delete one EventRecord
     *   }
     * })
     *
     */
    delete<T extends EventRecordDeleteArgs>(
      args: SelectSubset<T, EventRecordDeleteArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<Prisma.$EventRecordPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one EventRecord.
     * @param {EventRecordUpdateArgs} args - Arguments to update one EventRecord.
     * @example
     * // Update one EventRecord
     * const eventRecord = await prisma.eventRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EventRecordUpdateArgs>(
      args: SelectSubset<T, EventRecordUpdateArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<Prisma.$EventRecordPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more EventRecords.
     * @param {EventRecordDeleteManyArgs} args - Arguments to filter EventRecords to delete.
     * @example
     * // Delete a few EventRecords
     * const { count } = await prisma.eventRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EventRecordDeleteManyArgs>(
      args?: SelectSubset<T, EventRecordDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more EventRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventRecords
     * const eventRecord = await prisma.eventRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EventRecordUpdateManyArgs>(
      args: SelectSubset<T, EventRecordUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more EventRecords and returns the data updated in the database.
     * @param {EventRecordUpdateManyAndReturnArgs} args - Arguments to update many EventRecords.
     * @example
     * // Update many EventRecords
     * const eventRecord = await prisma.eventRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more EventRecords and only return the `id`
     * const eventRecordWithIdOnly = await prisma.eventRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends EventRecordUpdateManyAndReturnArgs>(
      args: SelectSubset<T, EventRecordUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$EventRecordPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one EventRecord.
     * @param {EventRecordUpsertArgs} args - Arguments to update or create a EventRecord.
     * @example
     * // Update or create a EventRecord
     * const eventRecord = await prisma.eventRecord.upsert({
     *   create: {
     *     // ... data to create a EventRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventRecord we want to update
     *   }
     * })
     */
    upsert<T extends EventRecordUpsertArgs>(
      args: SelectSubset<T, EventRecordUpsertArgs<ExtArgs>>
    ): Prisma__EventRecordClient<
      $Result.GetResult<Prisma.$EventRecordPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of EventRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordCountArgs} args - Arguments to filter EventRecords to count.
     * @example
     * // Count the number of EventRecords
     * const count = await prisma.eventRecord.count({
     *   where: {
     *     // ... the filter for the EventRecords we want to count
     *   }
     * })
     **/
    count<T extends EventRecordCountArgs>(
      args?: Subset<T, EventRecordCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventRecordCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a EventRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends EventRecordAggregateArgs>(
      args: Subset<T, EventRecordAggregateArgs>
    ): Prisma.PrismaPromise<GetEventRecordAggregateType<T>>;

    /**
     * Group by EventRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends EventRecordGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventRecordGroupByArgs['orderBy'] }
        : { orderBy?: EventRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, EventRecordGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetEventRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the EventRecord model
     */
    readonly fields: EventRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventRecordClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the EventRecord model
   */
  interface EventRecordFieldRefs {
    readonly id: FieldRef<'EventRecord', 'String'>;
    readonly title: FieldRef<'EventRecord', 'String'>;
    readonly clientName: FieldRef<'EventRecord', 'String'>;
    readonly companyName: FieldRef<'EventRecord', 'String'>;
    readonly screenName: FieldRef<'EventRecord', 'String'>;
    readonly startAt: FieldRef<'EventRecord', 'DateTime'>;
    readonly endAt: FieldRef<'EventRecord', 'DateTime'>;
    readonly status: FieldRef<'EventRecord', 'RecordStatus'>;
    readonly createdAt: FieldRef<'EventRecord', 'DateTime'>;
    readonly updatedAt: FieldRef<'EventRecord', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * EventRecord findUnique
   */
  export type EventRecordFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * Filter, which EventRecord to fetch.
     */
    where: EventRecordWhereUniqueInput;
  };

  /**
   * EventRecord findUniqueOrThrow
   */
  export type EventRecordFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * Filter, which EventRecord to fetch.
     */
    where: EventRecordWhereUniqueInput;
  };

  /**
   * EventRecord findFirst
   */
  export type EventRecordFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * Filter, which EventRecord to fetch.
     */
    where?: EventRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventRecords to fetch.
     */
    orderBy?: EventRecordOrderByWithRelationInput | EventRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EventRecords.
     */
    cursor?: EventRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EventRecords.
     */
    distinct?: EventRecordScalarFieldEnum | EventRecordScalarFieldEnum[];
  };

  /**
   * EventRecord findFirstOrThrow
   */
  export type EventRecordFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * Filter, which EventRecord to fetch.
     */
    where?: EventRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventRecords to fetch.
     */
    orderBy?: EventRecordOrderByWithRelationInput | EventRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EventRecords.
     */
    cursor?: EventRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EventRecords.
     */
    distinct?: EventRecordScalarFieldEnum | EventRecordScalarFieldEnum[];
  };

  /**
   * EventRecord findMany
   */
  export type EventRecordFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * Filter, which EventRecords to fetch.
     */
    where?: EventRecordWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventRecords to fetch.
     */
    orderBy?: EventRecordOrderByWithRelationInput | EventRecordOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing EventRecords.
     */
    cursor?: EventRecordWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventRecords from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventRecords.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EventRecords.
     */
    distinct?: EventRecordScalarFieldEnum | EventRecordScalarFieldEnum[];
  };

  /**
   * EventRecord create
   */
  export type EventRecordCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * The data needed to create a EventRecord.
     */
    data: XOR<EventRecordCreateInput, EventRecordUncheckedCreateInput>;
  };

  /**
   * EventRecord createMany
   */
  export type EventRecordCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many EventRecords.
     */
    data: EventRecordCreateManyInput | EventRecordCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * EventRecord createManyAndReturn
   */
  export type EventRecordCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * The data used to create many EventRecords.
     */
    data: EventRecordCreateManyInput | EventRecordCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * EventRecord update
   */
  export type EventRecordUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * The data needed to update a EventRecord.
     */
    data: XOR<EventRecordUpdateInput, EventRecordUncheckedUpdateInput>;
    /**
     * Choose, which EventRecord to update.
     */
    where: EventRecordWhereUniqueInput;
  };

  /**
   * EventRecord updateMany
   */
  export type EventRecordUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update EventRecords.
     */
    data: XOR<EventRecordUpdateManyMutationInput, EventRecordUncheckedUpdateManyInput>;
    /**
     * Filter which EventRecords to update
     */
    where?: EventRecordWhereInput;
    /**
     * Limit how many EventRecords to update.
     */
    limit?: number;
  };

  /**
   * EventRecord updateManyAndReturn
   */
  export type EventRecordUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * The data used to update EventRecords.
     */
    data: XOR<EventRecordUpdateManyMutationInput, EventRecordUncheckedUpdateManyInput>;
    /**
     * Filter which EventRecords to update
     */
    where?: EventRecordWhereInput;
    /**
     * Limit how many EventRecords to update.
     */
    limit?: number;
  };

  /**
   * EventRecord upsert
   */
  export type EventRecordUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * The filter to search for the EventRecord to update in case it exists.
     */
    where: EventRecordWhereUniqueInput;
    /**
     * In case the EventRecord found by the `where` argument doesn't exist, create a new EventRecord with this data.
     */
    create: XOR<EventRecordCreateInput, EventRecordUncheckedCreateInput>;
    /**
     * In case the EventRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventRecordUpdateInput, EventRecordUncheckedUpdateInput>;
  };

  /**
   * EventRecord delete
   */
  export type EventRecordDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
    /**
     * Filter which EventRecord to delete.
     */
    where: EventRecordWhereUniqueInput;
  };

  /**
   * EventRecord deleteMany
   */
  export type EventRecordDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which EventRecords to delete
     */
    where?: EventRecordWhereInput;
    /**
     * Limit how many EventRecords to delete.
     */
    limit?: number;
  };

  /**
   * EventRecord without action
   */
  export type EventRecordDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the EventRecord
     */
    select?: EventRecordSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRecord
     */
    omit?: EventRecordOmit<ExtArgs> | null;
  };

  /**
   * Model MeetingSchedule
   */

  export type AggregateMeetingSchedule = {
    _count: MeetingScheduleCountAggregateOutputType | null;
    _min: MeetingScheduleMinAggregateOutputType | null;
    _max: MeetingScheduleMaxAggregateOutputType | null;
  };

  export type MeetingScheduleMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    location: string | null;
    organizer: string | null;
    startAt: Date | null;
    endAt: Date | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MeetingScheduleMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    location: string | null;
    organizer: string | null;
    startAt: Date | null;
    endAt: Date | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MeetingScheduleCountAggregateOutputType = {
    id: number;
    title: number;
    location: number;
    organizer: number;
    startAt: number;
    endAt: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type MeetingScheduleMinAggregateInputType = {
    id?: true;
    title?: true;
    location?: true;
    organizer?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MeetingScheduleMaxAggregateInputType = {
    id?: true;
    title?: true;
    location?: true;
    organizer?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MeetingScheduleCountAggregateInputType = {
    id?: true;
    title?: true;
    location?: true;
    organizer?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type MeetingScheduleAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which MeetingSchedule to aggregate.
     */
    where?: MeetingScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingSchedules to fetch.
     */
    orderBy?: MeetingScheduleOrderByWithRelationInput | MeetingScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MeetingScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MeetingSchedules
     **/
    _count?: true | MeetingScheduleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MeetingScheduleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MeetingScheduleMaxAggregateInputType;
  };

  export type GetMeetingScheduleAggregateType<T extends MeetingScheduleAggregateArgs> = {
    [P in keyof T & keyof AggregateMeetingSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeetingSchedule[P]>
      : GetScalarType<T[P], AggregateMeetingSchedule[P]>;
  };

  export type MeetingScheduleGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: MeetingScheduleWhereInput;
    orderBy?:
      | MeetingScheduleOrderByWithAggregationInput
      | MeetingScheduleOrderByWithAggregationInput[];
    by: MeetingScheduleScalarFieldEnum[] | MeetingScheduleScalarFieldEnum;
    having?: MeetingScheduleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MeetingScheduleCountAggregateInputType | true;
    _min?: MeetingScheduleMinAggregateInputType;
    _max?: MeetingScheduleMaxAggregateInputType;
  };

  export type MeetingScheduleGroupByOutputType = {
    id: string;
    title: string;
    location: string | null;
    organizer: string | null;
    startAt: Date;
    endAt: Date | null;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: MeetingScheduleCountAggregateOutputType | null;
    _min: MeetingScheduleMinAggregateOutputType | null;
    _max: MeetingScheduleMaxAggregateOutputType | null;
  };

  type GetMeetingScheduleGroupByPayload<T extends MeetingScheduleGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MeetingScheduleGroupByOutputType, T['by']> & {
          [P in keyof T & keyof MeetingScheduleGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MeetingScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], MeetingScheduleGroupByOutputType[P]>;
        }
      >
    >;

  export type MeetingScheduleSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      location?: boolean;
      organizer?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['meetingSchedule']
  >;

  export type MeetingScheduleSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      location?: boolean;
      organizer?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['meetingSchedule']
  >;

  export type MeetingScheduleSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      location?: boolean;
      organizer?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['meetingSchedule']
  >;

  export type MeetingScheduleSelectScalar = {
    id?: boolean;
    title?: boolean;
    location?: boolean;
    organizer?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type MeetingScheduleOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    | 'id'
    | 'title'
    | 'location'
    | 'organizer'
    | 'startAt'
    | 'endAt'
    | 'status'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['meetingSchedule']
  >;

  export type $MeetingSchedulePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'MeetingSchedule';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        location: string | null;
        organizer: string | null;
        startAt: Date;
        endAt: Date | null;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['meetingSchedule']
    >;
    composites: {};
  };

  type MeetingScheduleGetPayload<
    S extends boolean | null | undefined | MeetingScheduleDefaultArgs
  > = $Result.GetResult<Prisma.$MeetingSchedulePayload, S>;

  type MeetingScheduleCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<MeetingScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MeetingScheduleCountAggregateInputType | true;
  };

  export interface MeetingScheduleDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['MeetingSchedule'];
      meta: { name: 'MeetingSchedule' };
    };
    /**
     * Find zero or one MeetingSchedule that matches the filter.
     * @param {MeetingScheduleFindUniqueArgs} args - Arguments to find a MeetingSchedule
     * @example
     * // Get one MeetingSchedule
     * const meetingSchedule = await prisma.meetingSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MeetingScheduleFindUniqueArgs>(
      args: SelectSubset<T, MeetingScheduleFindUniqueArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<
        Prisma.$MeetingSchedulePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one MeetingSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MeetingScheduleFindUniqueOrThrowArgs} args - Arguments to find a MeetingSchedule
     * @example
     * // Get one MeetingSchedule
     * const meetingSchedule = await prisma.meetingSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MeetingScheduleFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MeetingScheduleFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<
        Prisma.$MeetingSchedulePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MeetingSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleFindFirstArgs} args - Arguments to find a MeetingSchedule
     * @example
     * // Get one MeetingSchedule
     * const meetingSchedule = await prisma.meetingSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MeetingScheduleFindFirstArgs>(
      args?: SelectSubset<T, MeetingScheduleFindFirstArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<
        Prisma.$MeetingSchedulePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MeetingSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleFindFirstOrThrowArgs} args - Arguments to find a MeetingSchedule
     * @example
     * // Get one MeetingSchedule
     * const meetingSchedule = await prisma.meetingSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MeetingScheduleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MeetingScheduleFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<
        Prisma.$MeetingSchedulePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more MeetingSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MeetingSchedules
     * const meetingSchedules = await prisma.meetingSchedule.findMany()
     *
     * // Get first 10 MeetingSchedules
     * const meetingSchedules = await prisma.meetingSchedule.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const meetingScheduleWithIdOnly = await prisma.meetingSchedule.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MeetingScheduleFindManyArgs>(
      args?: SelectSubset<T, MeetingScheduleFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$MeetingSchedulePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a MeetingSchedule.
     * @param {MeetingScheduleCreateArgs} args - Arguments to create a MeetingSchedule.
     * @example
     * // Create one MeetingSchedule
     * const MeetingSchedule = await prisma.meetingSchedule.create({
     *   data: {
     *     // ... data to create a MeetingSchedule
     *   }
     * })
     *
     */
    create<T extends MeetingScheduleCreateArgs>(
      args: SelectSubset<T, MeetingScheduleCreateArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<Prisma.$MeetingSchedulePayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many MeetingSchedules.
     * @param {MeetingScheduleCreateManyArgs} args - Arguments to create many MeetingSchedules.
     * @example
     * // Create many MeetingSchedules
     * const meetingSchedule = await prisma.meetingSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MeetingScheduleCreateManyArgs>(
      args?: SelectSubset<T, MeetingScheduleCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many MeetingSchedules and returns the data saved in the database.
     * @param {MeetingScheduleCreateManyAndReturnArgs} args - Arguments to create many MeetingSchedules.
     * @example
     * // Create many MeetingSchedules
     * const meetingSchedule = await prisma.meetingSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MeetingSchedules and only return the `id`
     * const meetingScheduleWithIdOnly = await prisma.meetingSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MeetingScheduleCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MeetingScheduleCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MeetingSchedulePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a MeetingSchedule.
     * @param {MeetingScheduleDeleteArgs} args - Arguments to delete one MeetingSchedule.
     * @example
     * // Delete one MeetingSchedule
     * const MeetingSchedule = await prisma.meetingSchedule.delete({
     *   where: {
     *     // ... filter to delete one MeetingSchedule
     *   }
     * })
     *
     */
    delete<T extends MeetingScheduleDeleteArgs>(
      args: SelectSubset<T, MeetingScheduleDeleteArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<Prisma.$MeetingSchedulePayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one MeetingSchedule.
     * @param {MeetingScheduleUpdateArgs} args - Arguments to update one MeetingSchedule.
     * @example
     * // Update one MeetingSchedule
     * const meetingSchedule = await prisma.meetingSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MeetingScheduleUpdateArgs>(
      args: SelectSubset<T, MeetingScheduleUpdateArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<Prisma.$MeetingSchedulePayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more MeetingSchedules.
     * @param {MeetingScheduleDeleteManyArgs} args - Arguments to filter MeetingSchedules to delete.
     * @example
     * // Delete a few MeetingSchedules
     * const { count } = await prisma.meetingSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MeetingScheduleDeleteManyArgs>(
      args?: SelectSubset<T, MeetingScheduleDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MeetingSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MeetingSchedules
     * const meetingSchedule = await prisma.meetingSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MeetingScheduleUpdateManyArgs>(
      args: SelectSubset<T, MeetingScheduleUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MeetingSchedules and returns the data updated in the database.
     * @param {MeetingScheduleUpdateManyAndReturnArgs} args - Arguments to update many MeetingSchedules.
     * @example
     * // Update many MeetingSchedules
     * const meetingSchedule = await prisma.meetingSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MeetingSchedules and only return the `id`
     * const meetingScheduleWithIdOnly = await prisma.meetingSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MeetingScheduleUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MeetingScheduleUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MeetingSchedulePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one MeetingSchedule.
     * @param {MeetingScheduleUpsertArgs} args - Arguments to update or create a MeetingSchedule.
     * @example
     * // Update or create a MeetingSchedule
     * const meetingSchedule = await prisma.meetingSchedule.upsert({
     *   create: {
     *     // ... data to create a MeetingSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MeetingSchedule we want to update
     *   }
     * })
     */
    upsert<T extends MeetingScheduleUpsertArgs>(
      args: SelectSubset<T, MeetingScheduleUpsertArgs<ExtArgs>>
    ): Prisma__MeetingScheduleClient<
      $Result.GetResult<Prisma.$MeetingSchedulePayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of MeetingSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleCountArgs} args - Arguments to filter MeetingSchedules to count.
     * @example
     * // Count the number of MeetingSchedules
     * const count = await prisma.meetingSchedule.count({
     *   where: {
     *     // ... the filter for the MeetingSchedules we want to count
     *   }
     * })
     **/
    count<T extends MeetingScheduleCountArgs>(
      args?: Subset<T, MeetingScheduleCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MeetingScheduleCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a MeetingSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MeetingScheduleAggregateArgs>(
      args: Subset<T, MeetingScheduleAggregateArgs>
    ): Prisma.PrismaPromise<GetMeetingScheduleAggregateType<T>>;

    /**
     * Group by MeetingSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MeetingScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MeetingScheduleGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MeetingScheduleGroupByArgs['orderBy'] }
        : { orderBy?: MeetingScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, MeetingScheduleGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetMeetingScheduleGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MeetingSchedule model
     */
    readonly fields: MeetingScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MeetingSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MeetingScheduleClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the MeetingSchedule model
   */
  interface MeetingScheduleFieldRefs {
    readonly id: FieldRef<'MeetingSchedule', 'String'>;
    readonly title: FieldRef<'MeetingSchedule', 'String'>;
    readonly location: FieldRef<'MeetingSchedule', 'String'>;
    readonly organizer: FieldRef<'MeetingSchedule', 'String'>;
    readonly startAt: FieldRef<'MeetingSchedule', 'DateTime'>;
    readonly endAt: FieldRef<'MeetingSchedule', 'DateTime'>;
    readonly status: FieldRef<'MeetingSchedule', 'RecordStatus'>;
    readonly createdAt: FieldRef<'MeetingSchedule', 'DateTime'>;
    readonly updatedAt: FieldRef<'MeetingSchedule', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * MeetingSchedule findUnique
   */
  export type MeetingScheduleFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingSchedule to fetch.
     */
    where: MeetingScheduleWhereUniqueInput;
  };

  /**
   * MeetingSchedule findUniqueOrThrow
   */
  export type MeetingScheduleFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingSchedule to fetch.
     */
    where: MeetingScheduleWhereUniqueInput;
  };

  /**
   * MeetingSchedule findFirst
   */
  export type MeetingScheduleFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingSchedule to fetch.
     */
    where?: MeetingScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingSchedules to fetch.
     */
    orderBy?: MeetingScheduleOrderByWithRelationInput | MeetingScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MeetingSchedules.
     */
    cursor?: MeetingScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeetingSchedules.
     */
    distinct?: MeetingScheduleScalarFieldEnum | MeetingScheduleScalarFieldEnum[];
  };

  /**
   * MeetingSchedule findFirstOrThrow
   */
  export type MeetingScheduleFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingSchedule to fetch.
     */
    where?: MeetingScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingSchedules to fetch.
     */
    orderBy?: MeetingScheduleOrderByWithRelationInput | MeetingScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MeetingSchedules.
     */
    cursor?: MeetingScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeetingSchedules.
     */
    distinct?: MeetingScheduleScalarFieldEnum | MeetingScheduleScalarFieldEnum[];
  };

  /**
   * MeetingSchedule findMany
   */
  export type MeetingScheduleFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MeetingSchedules to fetch.
     */
    where?: MeetingScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MeetingSchedules to fetch.
     */
    orderBy?: MeetingScheduleOrderByWithRelationInput | MeetingScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MeetingSchedules.
     */
    cursor?: MeetingScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MeetingSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MeetingSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MeetingSchedules.
     */
    distinct?: MeetingScheduleScalarFieldEnum | MeetingScheduleScalarFieldEnum[];
  };

  /**
   * MeetingSchedule create
   */
  export type MeetingScheduleCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * The data needed to create a MeetingSchedule.
     */
    data: XOR<MeetingScheduleCreateInput, MeetingScheduleUncheckedCreateInput>;
  };

  /**
   * MeetingSchedule createMany
   */
  export type MeetingScheduleCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many MeetingSchedules.
     */
    data: MeetingScheduleCreateManyInput | MeetingScheduleCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * MeetingSchedule createManyAndReturn
   */
  export type MeetingScheduleCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * The data used to create many MeetingSchedules.
     */
    data: MeetingScheduleCreateManyInput | MeetingScheduleCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * MeetingSchedule update
   */
  export type MeetingScheduleUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * The data needed to update a MeetingSchedule.
     */
    data: XOR<MeetingScheduleUpdateInput, MeetingScheduleUncheckedUpdateInput>;
    /**
     * Choose, which MeetingSchedule to update.
     */
    where: MeetingScheduleWhereUniqueInput;
  };

  /**
   * MeetingSchedule updateMany
   */
  export type MeetingScheduleUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update MeetingSchedules.
     */
    data: XOR<MeetingScheduleUpdateManyMutationInput, MeetingScheduleUncheckedUpdateManyInput>;
    /**
     * Filter which MeetingSchedules to update
     */
    where?: MeetingScheduleWhereInput;
    /**
     * Limit how many MeetingSchedules to update.
     */
    limit?: number;
  };

  /**
   * MeetingSchedule updateManyAndReturn
   */
  export type MeetingScheduleUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * The data used to update MeetingSchedules.
     */
    data: XOR<MeetingScheduleUpdateManyMutationInput, MeetingScheduleUncheckedUpdateManyInput>;
    /**
     * Filter which MeetingSchedules to update
     */
    where?: MeetingScheduleWhereInput;
    /**
     * Limit how many MeetingSchedules to update.
     */
    limit?: number;
  };

  /**
   * MeetingSchedule upsert
   */
  export type MeetingScheduleUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * The filter to search for the MeetingSchedule to update in case it exists.
     */
    where: MeetingScheduleWhereUniqueInput;
    /**
     * In case the MeetingSchedule found by the `where` argument doesn't exist, create a new MeetingSchedule with this data.
     */
    create: XOR<MeetingScheduleCreateInput, MeetingScheduleUncheckedCreateInput>;
    /**
     * In case the MeetingSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MeetingScheduleUpdateInput, MeetingScheduleUncheckedUpdateInput>;
  };

  /**
   * MeetingSchedule delete
   */
  export type MeetingScheduleDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
    /**
     * Filter which MeetingSchedule to delete.
     */
    where: MeetingScheduleWhereUniqueInput;
  };

  /**
   * MeetingSchedule deleteMany
   */
  export type MeetingScheduleDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which MeetingSchedules to delete
     */
    where?: MeetingScheduleWhereInput;
    /**
     * Limit how many MeetingSchedules to delete.
     */
    limit?: number;
  };

  /**
   * MeetingSchedule without action
   */
  export type MeetingScheduleDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MeetingSchedule
     */
    select?: MeetingScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MeetingSchedule
     */
    omit?: MeetingScheduleOmit<ExtArgs> | null;
  };

  /**
   * Model Advertisement
   */

  export type AggregateAdvertisement = {
    _count: AdvertisementCountAggregateOutputType | null;
    _avg: AdvertisementAvgAggregateOutputType | null;
    _sum: AdvertisementSumAggregateOutputType | null;
    _min: AdvertisementMinAggregateOutputType | null;
    _max: AdvertisementMaxAggregateOutputType | null;
  };

  export type AdvertisementAvgAggregateOutputType = {
    duration: number | null;
    sortOrder: number | null;
  };

  export type AdvertisementSumAggregateOutputType = {
    duration: number | null;
    sortOrder: number | null;
  };

  export type AdvertisementMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    mediaUrl: string | null;
    mediaType: $Enums.AdMediaType | null;
    duration: number | null;
    sortOrder: number | null;
    status: $Enums.RecordStatus | null;
    startAt: Date | null;
    endAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AdvertisementMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    mediaUrl: string | null;
    mediaType: $Enums.AdMediaType | null;
    duration: number | null;
    sortOrder: number | null;
    status: $Enums.RecordStatus | null;
    startAt: Date | null;
    endAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AdvertisementCountAggregateOutputType = {
    id: number;
    title: number;
    mediaUrl: number;
    mediaType: number;
    duration: number;
    sortOrder: number;
    status: number;
    startAt: number;
    endAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AdvertisementAvgAggregateInputType = {
    duration?: true;
    sortOrder?: true;
  };

  export type AdvertisementSumAggregateInputType = {
    duration?: true;
    sortOrder?: true;
  };

  export type AdvertisementMinAggregateInputType = {
    id?: true;
    title?: true;
    mediaUrl?: true;
    mediaType?: true;
    duration?: true;
    sortOrder?: true;
    status?: true;
    startAt?: true;
    endAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AdvertisementMaxAggregateInputType = {
    id?: true;
    title?: true;
    mediaUrl?: true;
    mediaType?: true;
    duration?: true;
    sortOrder?: true;
    status?: true;
    startAt?: true;
    endAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AdvertisementCountAggregateInputType = {
    id?: true;
    title?: true;
    mediaUrl?: true;
    mediaType?: true;
    duration?: true;
    sortOrder?: true;
    status?: true;
    startAt?: true;
    endAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AdvertisementAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Advertisement to aggregate.
     */
    where?: AdvertisementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisements to fetch.
     */
    orderBy?: AdvertisementOrderByWithRelationInput | AdvertisementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AdvertisementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Advertisements
     **/
    _count?: true | AdvertisementCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AdvertisementAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AdvertisementSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AdvertisementMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AdvertisementMaxAggregateInputType;
  };

  export type GetAdvertisementAggregateType<T extends AdvertisementAggregateArgs> = {
    [P in keyof T & keyof AggregateAdvertisement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdvertisement[P]>
      : GetScalarType<T[P], AggregateAdvertisement[P]>;
  };

  export type AdvertisementGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: AdvertisementWhereInput;
    orderBy?: AdvertisementOrderByWithAggregationInput | AdvertisementOrderByWithAggregationInput[];
    by: AdvertisementScalarFieldEnum[] | AdvertisementScalarFieldEnum;
    having?: AdvertisementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdvertisementCountAggregateInputType | true;
    _avg?: AdvertisementAvgAggregateInputType;
    _sum?: AdvertisementSumAggregateInputType;
    _min?: AdvertisementMinAggregateInputType;
    _max?: AdvertisementMaxAggregateInputType;
  };

  export type AdvertisementGroupByOutputType = {
    id: string;
    title: string;
    mediaUrl: string;
    mediaType: $Enums.AdMediaType;
    duration: number | null;
    sortOrder: number;
    status: $Enums.RecordStatus;
    startAt: Date | null;
    endAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AdvertisementCountAggregateOutputType | null;
    _avg: AdvertisementAvgAggregateOutputType | null;
    _sum: AdvertisementSumAggregateOutputType | null;
    _min: AdvertisementMinAggregateOutputType | null;
    _max: AdvertisementMaxAggregateOutputType | null;
  };

  type GetAdvertisementGroupByPayload<T extends AdvertisementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdvertisementGroupByOutputType, T['by']> & {
        [P in keyof T & keyof AdvertisementGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AdvertisementGroupByOutputType[P]>
          : GetScalarType<T[P], AdvertisementGroupByOutputType[P]>;
      }
    >
  >;

  export type AdvertisementSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      mediaUrl?: boolean;
      mediaType?: boolean;
      duration?: boolean;
      sortOrder?: boolean;
      status?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['advertisement']
  >;

  export type AdvertisementSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      mediaUrl?: boolean;
      mediaType?: boolean;
      duration?: boolean;
      sortOrder?: boolean;
      status?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['advertisement']
  >;

  export type AdvertisementSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      mediaUrl?: boolean;
      mediaType?: boolean;
      duration?: boolean;
      sortOrder?: boolean;
      status?: boolean;
      startAt?: boolean;
      endAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['advertisement']
  >;

  export type AdvertisementSelectScalar = {
    id?: boolean;
    title?: boolean;
    mediaUrl?: boolean;
    mediaType?: boolean;
    duration?: boolean;
    sortOrder?: boolean;
    status?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AdvertisementOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    | 'id'
    | 'title'
    | 'mediaUrl'
    | 'mediaType'
    | 'duration'
    | 'sortOrder'
    | 'status'
    | 'startAt'
    | 'endAt'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['advertisement']
  >;

  export type $AdvertisementPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'Advertisement';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        title: string;
        mediaUrl: string;
        mediaType: $Enums.AdMediaType;
        duration: number | null;
        sortOrder: number;
        status: $Enums.RecordStatus;
        startAt: Date | null;
        endAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['advertisement']
    >;
    composites: {};
  };

  type AdvertisementGetPayload<S extends boolean | null | undefined | AdvertisementDefaultArgs> =
    $Result.GetResult<Prisma.$AdvertisementPayload, S>;

  type AdvertisementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdvertisementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdvertisementCountAggregateInputType | true;
    };

  export interface AdvertisementDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Advertisement'];
      meta: { name: 'Advertisement' };
    };
    /**
     * Find zero or one Advertisement that matches the filter.
     * @param {AdvertisementFindUniqueArgs} args - Arguments to find a Advertisement
     * @example
     * // Get one Advertisement
     * const advertisement = await prisma.advertisement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdvertisementFindUniqueArgs>(
      args: SelectSubset<T, AdvertisementFindUniqueArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<
        Prisma.$AdvertisementPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Advertisement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdvertisementFindUniqueOrThrowArgs} args - Arguments to find a Advertisement
     * @example
     * // Get one Advertisement
     * const advertisement = await prisma.advertisement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdvertisementFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AdvertisementFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<
        Prisma.$AdvertisementPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Advertisement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementFindFirstArgs} args - Arguments to find a Advertisement
     * @example
     * // Get one Advertisement
     * const advertisement = await prisma.advertisement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdvertisementFindFirstArgs>(
      args?: SelectSubset<T, AdvertisementFindFirstArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<
        Prisma.$AdvertisementPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Advertisement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementFindFirstOrThrowArgs} args - Arguments to find a Advertisement
     * @example
     * // Get one Advertisement
     * const advertisement = await prisma.advertisement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdvertisementFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AdvertisementFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<
        Prisma.$AdvertisementPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Advertisements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Advertisements
     * const advertisements = await prisma.advertisement.findMany()
     *
     * // Get first 10 Advertisements
     * const advertisements = await prisma.advertisement.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const advertisementWithIdOnly = await prisma.advertisement.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AdvertisementFindManyArgs>(
      args?: SelectSubset<T, AdvertisementFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$AdvertisementPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a Advertisement.
     * @param {AdvertisementCreateArgs} args - Arguments to create a Advertisement.
     * @example
     * // Create one Advertisement
     * const Advertisement = await prisma.advertisement.create({
     *   data: {
     *     // ... data to create a Advertisement
     *   }
     * })
     *
     */
    create<T extends AdvertisementCreateArgs>(
      args: SelectSubset<T, AdvertisementCreateArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<Prisma.$AdvertisementPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Advertisements.
     * @param {AdvertisementCreateManyArgs} args - Arguments to create many Advertisements.
     * @example
     * // Create many Advertisements
     * const advertisement = await prisma.advertisement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AdvertisementCreateManyArgs>(
      args?: SelectSubset<T, AdvertisementCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Advertisements and returns the data saved in the database.
     * @param {AdvertisementCreateManyAndReturnArgs} args - Arguments to create many Advertisements.
     * @example
     * // Create many Advertisements
     * const advertisement = await prisma.advertisement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Advertisements and only return the `id`
     * const advertisementWithIdOnly = await prisma.advertisement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AdvertisementCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AdvertisementCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AdvertisementPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Advertisement.
     * @param {AdvertisementDeleteArgs} args - Arguments to delete one Advertisement.
     * @example
     * // Delete one Advertisement
     * const Advertisement = await prisma.advertisement.delete({
     *   where: {
     *     // ... filter to delete one Advertisement
     *   }
     * })
     *
     */
    delete<T extends AdvertisementDeleteArgs>(
      args: SelectSubset<T, AdvertisementDeleteArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<Prisma.$AdvertisementPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Advertisement.
     * @param {AdvertisementUpdateArgs} args - Arguments to update one Advertisement.
     * @example
     * // Update one Advertisement
     * const advertisement = await prisma.advertisement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AdvertisementUpdateArgs>(
      args: SelectSubset<T, AdvertisementUpdateArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<Prisma.$AdvertisementPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Advertisements.
     * @param {AdvertisementDeleteManyArgs} args - Arguments to filter Advertisements to delete.
     * @example
     * // Delete a few Advertisements
     * const { count } = await prisma.advertisement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AdvertisementDeleteManyArgs>(
      args?: SelectSubset<T, AdvertisementDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Advertisements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Advertisements
     * const advertisement = await prisma.advertisement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AdvertisementUpdateManyArgs>(
      args: SelectSubset<T, AdvertisementUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Advertisements and returns the data updated in the database.
     * @param {AdvertisementUpdateManyAndReturnArgs} args - Arguments to update many Advertisements.
     * @example
     * // Update many Advertisements
     * const advertisement = await prisma.advertisement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Advertisements and only return the `id`
     * const advertisementWithIdOnly = await prisma.advertisement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AdvertisementUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AdvertisementUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AdvertisementPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Advertisement.
     * @param {AdvertisementUpsertArgs} args - Arguments to update or create a Advertisement.
     * @example
     * // Update or create a Advertisement
     * const advertisement = await prisma.advertisement.upsert({
     *   create: {
     *     // ... data to create a Advertisement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Advertisement we want to update
     *   }
     * })
     */
    upsert<T extends AdvertisementUpsertArgs>(
      args: SelectSubset<T, AdvertisementUpsertArgs<ExtArgs>>
    ): Prisma__AdvertisementClient<
      $Result.GetResult<Prisma.$AdvertisementPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Advertisements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementCountArgs} args - Arguments to filter Advertisements to count.
     * @example
     * // Count the number of Advertisements
     * const count = await prisma.advertisement.count({
     *   where: {
     *     // ... the filter for the Advertisements we want to count
     *   }
     * })
     **/
    count<T extends AdvertisementCountArgs>(
      args?: Subset<T, AdvertisementCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdvertisementCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Advertisement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AdvertisementAggregateArgs>(
      args: Subset<T, AdvertisementAggregateArgs>
    ): Prisma.PrismaPromise<GetAdvertisementAggregateType<T>>;

    /**
     * Group by Advertisement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdvertisementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AdvertisementGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdvertisementGroupByArgs['orderBy'] }
        : { orderBy?: AdvertisementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, AdvertisementGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetAdvertisementGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Advertisement model
     */
    readonly fields: AdvertisementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Advertisement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdvertisementClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Advertisement model
   */
  interface AdvertisementFieldRefs {
    readonly id: FieldRef<'Advertisement', 'String'>;
    readonly title: FieldRef<'Advertisement', 'String'>;
    readonly mediaUrl: FieldRef<'Advertisement', 'String'>;
    readonly mediaType: FieldRef<'Advertisement', 'AdMediaType'>;
    readonly duration: FieldRef<'Advertisement', 'Int'>;
    readonly sortOrder: FieldRef<'Advertisement', 'Int'>;
    readonly status: FieldRef<'Advertisement', 'RecordStatus'>;
    readonly startAt: FieldRef<'Advertisement', 'DateTime'>;
    readonly endAt: FieldRef<'Advertisement', 'DateTime'>;
    readonly createdAt: FieldRef<'Advertisement', 'DateTime'>;
    readonly updatedAt: FieldRef<'Advertisement', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Advertisement findUnique
   */
  export type AdvertisementFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * Filter, which Advertisement to fetch.
     */
    where: AdvertisementWhereUniqueInput;
  };

  /**
   * Advertisement findUniqueOrThrow
   */
  export type AdvertisementFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * Filter, which Advertisement to fetch.
     */
    where: AdvertisementWhereUniqueInput;
  };

  /**
   * Advertisement findFirst
   */
  export type AdvertisementFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * Filter, which Advertisement to fetch.
     */
    where?: AdvertisementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisements to fetch.
     */
    orderBy?: AdvertisementOrderByWithRelationInput | AdvertisementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Advertisements.
     */
    cursor?: AdvertisementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Advertisements.
     */
    distinct?: AdvertisementScalarFieldEnum | AdvertisementScalarFieldEnum[];
  };

  /**
   * Advertisement findFirstOrThrow
   */
  export type AdvertisementFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * Filter, which Advertisement to fetch.
     */
    where?: AdvertisementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisements to fetch.
     */
    orderBy?: AdvertisementOrderByWithRelationInput | AdvertisementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Advertisements.
     */
    cursor?: AdvertisementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Advertisements.
     */
    distinct?: AdvertisementScalarFieldEnum | AdvertisementScalarFieldEnum[];
  };

  /**
   * Advertisement findMany
   */
  export type AdvertisementFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * Filter, which Advertisements to fetch.
     */
    where?: AdvertisementWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Advertisements to fetch.
     */
    orderBy?: AdvertisementOrderByWithRelationInput | AdvertisementOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Advertisements.
     */
    cursor?: AdvertisementWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Advertisements from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Advertisements.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Advertisements.
     */
    distinct?: AdvertisementScalarFieldEnum | AdvertisementScalarFieldEnum[];
  };

  /**
   * Advertisement create
   */
  export type AdvertisementCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * The data needed to create a Advertisement.
     */
    data: XOR<AdvertisementCreateInput, AdvertisementUncheckedCreateInput>;
  };

  /**
   * Advertisement createMany
   */
  export type AdvertisementCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Advertisements.
     */
    data: AdvertisementCreateManyInput | AdvertisementCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Advertisement createManyAndReturn
   */
  export type AdvertisementCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * The data used to create many Advertisements.
     */
    data: AdvertisementCreateManyInput | AdvertisementCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Advertisement update
   */
  export type AdvertisementUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * The data needed to update a Advertisement.
     */
    data: XOR<AdvertisementUpdateInput, AdvertisementUncheckedUpdateInput>;
    /**
     * Choose, which Advertisement to update.
     */
    where: AdvertisementWhereUniqueInput;
  };

  /**
   * Advertisement updateMany
   */
  export type AdvertisementUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Advertisements.
     */
    data: XOR<AdvertisementUpdateManyMutationInput, AdvertisementUncheckedUpdateManyInput>;
    /**
     * Filter which Advertisements to update
     */
    where?: AdvertisementWhereInput;
    /**
     * Limit how many Advertisements to update.
     */
    limit?: number;
  };

  /**
   * Advertisement updateManyAndReturn
   */
  export type AdvertisementUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * The data used to update Advertisements.
     */
    data: XOR<AdvertisementUpdateManyMutationInput, AdvertisementUncheckedUpdateManyInput>;
    /**
     * Filter which Advertisements to update
     */
    where?: AdvertisementWhereInput;
    /**
     * Limit how many Advertisements to update.
     */
    limit?: number;
  };

  /**
   * Advertisement upsert
   */
  export type AdvertisementUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * The filter to search for the Advertisement to update in case it exists.
     */
    where: AdvertisementWhereUniqueInput;
    /**
     * In case the Advertisement found by the `where` argument doesn't exist, create a new Advertisement with this data.
     */
    create: XOR<AdvertisementCreateInput, AdvertisementUncheckedCreateInput>;
    /**
     * In case the Advertisement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdvertisementUpdateInput, AdvertisementUncheckedUpdateInput>;
  };

  /**
   * Advertisement delete
   */
  export type AdvertisementDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
    /**
     * Filter which Advertisement to delete.
     */
    where: AdvertisementWhereUniqueInput;
  };

  /**
   * Advertisement deleteMany
   */
  export type AdvertisementDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Advertisements to delete
     */
    where?: AdvertisementWhereInput;
    /**
     * Limit how many Advertisements to delete.
     */
    limit?: number;
  };

  /**
   * Advertisement without action
   */
  export type AdvertisementDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Advertisement
     */
    select?: AdvertisementSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Advertisement
     */
    omit?: AdvertisementOmit<ExtArgs> | null;
  };

  /**
   * Model WeatherSetting
   */

  export type AggregateWeatherSetting = {
    _count: WeatherSettingCountAggregateOutputType | null;
    _min: WeatherSettingMinAggregateOutputType | null;
    _max: WeatherSettingMaxAggregateOutputType | null;
  };

  export type WeatherSettingMinAggregateOutputType = {
    id: string | null;
    city: string | null;
    provider: string | null;
    apiKey: string | null;
    enabled: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WeatherSettingMaxAggregateOutputType = {
    id: string | null;
    city: string | null;
    provider: string | null;
    apiKey: string | null;
    enabled: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type WeatherSettingCountAggregateOutputType = {
    id: number;
    city: number;
    provider: number;
    apiKey: number;
    enabled: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type WeatherSettingMinAggregateInputType = {
    id?: true;
    city?: true;
    provider?: true;
    apiKey?: true;
    enabled?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WeatherSettingMaxAggregateInputType = {
    id?: true;
    city?: true;
    provider?: true;
    apiKey?: true;
    enabled?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type WeatherSettingCountAggregateInputType = {
    id?: true;
    city?: true;
    provider?: true;
    apiKey?: true;
    enabled?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type WeatherSettingAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which WeatherSetting to aggregate.
     */
    where?: WeatherSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WeatherSettings to fetch.
     */
    orderBy?: WeatherSettingOrderByWithRelationInput | WeatherSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WeatherSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WeatherSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WeatherSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WeatherSettings
     **/
    _count?: true | WeatherSettingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WeatherSettingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WeatherSettingMaxAggregateInputType;
  };

  export type GetWeatherSettingAggregateType<T extends WeatherSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateWeatherSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeatherSetting[P]>
      : GetScalarType<T[P], AggregateWeatherSetting[P]>;
  };

  export type WeatherSettingGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: WeatherSettingWhereInput;
    orderBy?:
      | WeatherSettingOrderByWithAggregationInput
      | WeatherSettingOrderByWithAggregationInput[];
    by: WeatherSettingScalarFieldEnum[] | WeatherSettingScalarFieldEnum;
    having?: WeatherSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WeatherSettingCountAggregateInputType | true;
    _min?: WeatherSettingMinAggregateInputType;
    _max?: WeatherSettingMaxAggregateInputType;
  };

  export type WeatherSettingGroupByOutputType = {
    id: string;
    city: string;
    provider: string;
    apiKey: string | null;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: WeatherSettingCountAggregateOutputType | null;
    _min: WeatherSettingMinAggregateOutputType | null;
    _max: WeatherSettingMaxAggregateOutputType | null;
  };

  type GetWeatherSettingGroupByPayload<T extends WeatherSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeatherSettingGroupByOutputType, T['by']> & {
        [P in keyof T & keyof WeatherSettingGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], WeatherSettingGroupByOutputType[P]>
          : GetScalarType<T[P], WeatherSettingGroupByOutputType[P]>;
      }
    >
  >;

  export type WeatherSettingSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      city?: boolean;
      provider?: boolean;
      apiKey?: boolean;
      enabled?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['weatherSetting']
  >;

  export type WeatherSettingSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      city?: boolean;
      provider?: boolean;
      apiKey?: boolean;
      enabled?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['weatherSetting']
  >;

  export type WeatherSettingSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      city?: boolean;
      provider?: boolean;
      apiKey?: boolean;
      enabled?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['weatherSetting']
  >;

  export type WeatherSettingSelectScalar = {
    id?: boolean;
    city?: boolean;
    provider?: boolean;
    apiKey?: boolean;
    enabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type WeatherSettingOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    'id' | 'city' | 'provider' | 'apiKey' | 'enabled' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['weatherSetting']
  >;

  export type $WeatherSettingPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'WeatherSetting';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        city: string;
        provider: string;
        apiKey: string | null;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['weatherSetting']
    >;
    composites: {};
  };

  type WeatherSettingGetPayload<S extends boolean | null | undefined | WeatherSettingDefaultArgs> =
    $Result.GetResult<Prisma.$WeatherSettingPayload, S>;

  type WeatherSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeatherSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeatherSettingCountAggregateInputType | true;
    };

  export interface WeatherSettingDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['WeatherSetting'];
      meta: { name: 'WeatherSetting' };
    };
    /**
     * Find zero or one WeatherSetting that matches the filter.
     * @param {WeatherSettingFindUniqueArgs} args - Arguments to find a WeatherSetting
     * @example
     * // Get one WeatherSetting
     * const weatherSetting = await prisma.weatherSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeatherSettingFindUniqueArgs>(
      args: SelectSubset<T, WeatherSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<
        Prisma.$WeatherSettingPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one WeatherSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeatherSettingFindUniqueOrThrowArgs} args - Arguments to find a WeatherSetting
     * @example
     * // Get one WeatherSetting
     * const weatherSetting = await prisma.weatherSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeatherSettingFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WeatherSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<
        Prisma.$WeatherSettingPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WeatherSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingFindFirstArgs} args - Arguments to find a WeatherSetting
     * @example
     * // Get one WeatherSetting
     * const weatherSetting = await prisma.weatherSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeatherSettingFindFirstArgs>(
      args?: SelectSubset<T, WeatherSettingFindFirstArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<
        Prisma.$WeatherSettingPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first WeatherSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingFindFirstOrThrowArgs} args - Arguments to find a WeatherSetting
     * @example
     * // Get one WeatherSetting
     * const weatherSetting = await prisma.weatherSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeatherSettingFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WeatherSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<
        Prisma.$WeatherSettingPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more WeatherSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeatherSettings
     * const weatherSettings = await prisma.weatherSetting.findMany()
     *
     * // Get first 10 WeatherSettings
     * const weatherSettings = await prisma.weatherSetting.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const weatherSettingWithIdOnly = await prisma.weatherSetting.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WeatherSettingFindManyArgs>(
      args?: SelectSubset<T, WeatherSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$WeatherSettingPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a WeatherSetting.
     * @param {WeatherSettingCreateArgs} args - Arguments to create a WeatherSetting.
     * @example
     * // Create one WeatherSetting
     * const WeatherSetting = await prisma.weatherSetting.create({
     *   data: {
     *     // ... data to create a WeatherSetting
     *   }
     * })
     *
     */
    create<T extends WeatherSettingCreateArgs>(
      args: SelectSubset<T, WeatherSettingCreateArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<Prisma.$WeatherSettingPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many WeatherSettings.
     * @param {WeatherSettingCreateManyArgs} args - Arguments to create many WeatherSettings.
     * @example
     * // Create many WeatherSettings
     * const weatherSetting = await prisma.weatherSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WeatherSettingCreateManyArgs>(
      args?: SelectSubset<T, WeatherSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many WeatherSettings and returns the data saved in the database.
     * @param {WeatherSettingCreateManyAndReturnArgs} args - Arguments to create many WeatherSettings.
     * @example
     * // Create many WeatherSettings
     * const weatherSetting = await prisma.weatherSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WeatherSettings and only return the `id`
     * const weatherSettingWithIdOnly = await prisma.weatherSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WeatherSettingCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WeatherSettingCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WeatherSettingPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a WeatherSetting.
     * @param {WeatherSettingDeleteArgs} args - Arguments to delete one WeatherSetting.
     * @example
     * // Delete one WeatherSetting
     * const WeatherSetting = await prisma.weatherSetting.delete({
     *   where: {
     *     // ... filter to delete one WeatherSetting
     *   }
     * })
     *
     */
    delete<T extends WeatherSettingDeleteArgs>(
      args: SelectSubset<T, WeatherSettingDeleteArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<Prisma.$WeatherSettingPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one WeatherSetting.
     * @param {WeatherSettingUpdateArgs} args - Arguments to update one WeatherSetting.
     * @example
     * // Update one WeatherSetting
     * const weatherSetting = await prisma.weatherSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WeatherSettingUpdateArgs>(
      args: SelectSubset<T, WeatherSettingUpdateArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<Prisma.$WeatherSettingPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more WeatherSettings.
     * @param {WeatherSettingDeleteManyArgs} args - Arguments to filter WeatherSettings to delete.
     * @example
     * // Delete a few WeatherSettings
     * const { count } = await prisma.weatherSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WeatherSettingDeleteManyArgs>(
      args?: SelectSubset<T, WeatherSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WeatherSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeatherSettings
     * const weatherSetting = await prisma.weatherSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WeatherSettingUpdateManyArgs>(
      args: SelectSubset<T, WeatherSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more WeatherSettings and returns the data updated in the database.
     * @param {WeatherSettingUpdateManyAndReturnArgs} args - Arguments to update many WeatherSettings.
     * @example
     * // Update many WeatherSettings
     * const weatherSetting = await prisma.weatherSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WeatherSettings and only return the `id`
     * const weatherSettingWithIdOnly = await prisma.weatherSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WeatherSettingUpdateManyAndReturnArgs>(
      args: SelectSubset<T, WeatherSettingUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WeatherSettingPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one WeatherSetting.
     * @param {WeatherSettingUpsertArgs} args - Arguments to update or create a WeatherSetting.
     * @example
     * // Update or create a WeatherSetting
     * const weatherSetting = await prisma.weatherSetting.upsert({
     *   create: {
     *     // ... data to create a WeatherSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeatherSetting we want to update
     *   }
     * })
     */
    upsert<T extends WeatherSettingUpsertArgs>(
      args: SelectSubset<T, WeatherSettingUpsertArgs<ExtArgs>>
    ): Prisma__WeatherSettingClient<
      $Result.GetResult<Prisma.$WeatherSettingPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of WeatherSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingCountArgs} args - Arguments to filter WeatherSettings to count.
     * @example
     * // Count the number of WeatherSettings
     * const count = await prisma.weatherSetting.count({
     *   where: {
     *     // ... the filter for the WeatherSettings we want to count
     *   }
     * })
     **/
    count<T extends WeatherSettingCountArgs>(
      args?: Subset<T, WeatherSettingCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeatherSettingCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a WeatherSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WeatherSettingAggregateArgs>(
      args: Subset<T, WeatherSettingAggregateArgs>
    ): Prisma.PrismaPromise<GetWeatherSettingAggregateType<T>>;

    /**
     * Group by WeatherSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeatherSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WeatherSettingGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeatherSettingGroupByArgs['orderBy'] }
        : { orderBy?: WeatherSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, WeatherSettingGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetWeatherSettingGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WeatherSetting model
     */
    readonly fields: WeatherSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeatherSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeatherSettingClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the WeatherSetting model
   */
  interface WeatherSettingFieldRefs {
    readonly id: FieldRef<'WeatherSetting', 'String'>;
    readonly city: FieldRef<'WeatherSetting', 'String'>;
    readonly provider: FieldRef<'WeatherSetting', 'String'>;
    readonly apiKey: FieldRef<'WeatherSetting', 'String'>;
    readonly enabled: FieldRef<'WeatherSetting', 'Boolean'>;
    readonly createdAt: FieldRef<'WeatherSetting', 'DateTime'>;
    readonly updatedAt: FieldRef<'WeatherSetting', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * WeatherSetting findUnique
   */
  export type WeatherSettingFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * Filter, which WeatherSetting to fetch.
     */
    where: WeatherSettingWhereUniqueInput;
  };

  /**
   * WeatherSetting findUniqueOrThrow
   */
  export type WeatherSettingFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * Filter, which WeatherSetting to fetch.
     */
    where: WeatherSettingWhereUniqueInput;
  };

  /**
   * WeatherSetting findFirst
   */
  export type WeatherSettingFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * Filter, which WeatherSetting to fetch.
     */
    where?: WeatherSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WeatherSettings to fetch.
     */
    orderBy?: WeatherSettingOrderByWithRelationInput | WeatherSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WeatherSettings.
     */
    cursor?: WeatherSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WeatherSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WeatherSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WeatherSettings.
     */
    distinct?: WeatherSettingScalarFieldEnum | WeatherSettingScalarFieldEnum[];
  };

  /**
   * WeatherSetting findFirstOrThrow
   */
  export type WeatherSettingFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * Filter, which WeatherSetting to fetch.
     */
    where?: WeatherSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WeatherSettings to fetch.
     */
    orderBy?: WeatherSettingOrderByWithRelationInput | WeatherSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WeatherSettings.
     */
    cursor?: WeatherSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WeatherSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WeatherSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WeatherSettings.
     */
    distinct?: WeatherSettingScalarFieldEnum | WeatherSettingScalarFieldEnum[];
  };

  /**
   * WeatherSetting findMany
   */
  export type WeatherSettingFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * Filter, which WeatherSettings to fetch.
     */
    where?: WeatherSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WeatherSettings to fetch.
     */
    orderBy?: WeatherSettingOrderByWithRelationInput | WeatherSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WeatherSettings.
     */
    cursor?: WeatherSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WeatherSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WeatherSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WeatherSettings.
     */
    distinct?: WeatherSettingScalarFieldEnum | WeatherSettingScalarFieldEnum[];
  };

  /**
   * WeatherSetting create
   */
  export type WeatherSettingCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * The data needed to create a WeatherSetting.
     */
    data: XOR<WeatherSettingCreateInput, WeatherSettingUncheckedCreateInput>;
  };

  /**
   * WeatherSetting createMany
   */
  export type WeatherSettingCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many WeatherSettings.
     */
    data: WeatherSettingCreateManyInput | WeatherSettingCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WeatherSetting createManyAndReturn
   */
  export type WeatherSettingCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * The data used to create many WeatherSettings.
     */
    data: WeatherSettingCreateManyInput | WeatherSettingCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * WeatherSetting update
   */
  export type WeatherSettingUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * The data needed to update a WeatherSetting.
     */
    data: XOR<WeatherSettingUpdateInput, WeatherSettingUncheckedUpdateInput>;
    /**
     * Choose, which WeatherSetting to update.
     */
    where: WeatherSettingWhereUniqueInput;
  };

  /**
   * WeatherSetting updateMany
   */
  export type WeatherSettingUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update WeatherSettings.
     */
    data: XOR<WeatherSettingUpdateManyMutationInput, WeatherSettingUncheckedUpdateManyInput>;
    /**
     * Filter which WeatherSettings to update
     */
    where?: WeatherSettingWhereInput;
    /**
     * Limit how many WeatherSettings to update.
     */
    limit?: number;
  };

  /**
   * WeatherSetting updateManyAndReturn
   */
  export type WeatherSettingUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * The data used to update WeatherSettings.
     */
    data: XOR<WeatherSettingUpdateManyMutationInput, WeatherSettingUncheckedUpdateManyInput>;
    /**
     * Filter which WeatherSettings to update
     */
    where?: WeatherSettingWhereInput;
    /**
     * Limit how many WeatherSettings to update.
     */
    limit?: number;
  };

  /**
   * WeatherSetting upsert
   */
  export type WeatherSettingUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * The filter to search for the WeatherSetting to update in case it exists.
     */
    where: WeatherSettingWhereUniqueInput;
    /**
     * In case the WeatherSetting found by the `where` argument doesn't exist, create a new WeatherSetting with this data.
     */
    create: XOR<WeatherSettingCreateInput, WeatherSettingUncheckedCreateInput>;
    /**
     * In case the WeatherSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeatherSettingUpdateInput, WeatherSettingUncheckedUpdateInput>;
  };

  /**
   * WeatherSetting delete
   */
  export type WeatherSettingDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
    /**
     * Filter which WeatherSetting to delete.
     */
    where: WeatherSettingWhereUniqueInput;
  };

  /**
   * WeatherSetting deleteMany
   */
  export type WeatherSettingDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which WeatherSettings to delete
     */
    where?: WeatherSettingWhereInput;
    /**
     * Limit how many WeatherSettings to delete.
     */
    limit?: number;
  };

  /**
   * WeatherSetting without action
   */
  export type WeatherSettingDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the WeatherSetting
     */
    select?: WeatherSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WeatherSetting
     */
    omit?: WeatherSettingOmit<ExtArgs> | null;
  };

  /**
   * Model MovieSchedule
   */

  export type AggregateMovieSchedule = {
    _count: MovieScheduleCountAggregateOutputType | null;
    _min: MovieScheduleMinAggregateOutputType | null;
    _max: MovieScheduleMaxAggregateOutputType | null;
  };

  export type MovieScheduleMinAggregateOutputType = {
    id: string | null;
    movieName: string | null;
    screenName: string | null;
    showTime: Date | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MovieScheduleMaxAggregateOutputType = {
    id: string | null;
    movieName: string | null;
    screenName: string | null;
    showTime: Date | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type MovieScheduleCountAggregateOutputType = {
    id: number;
    movieName: number;
    screenName: number;
    showTime: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type MovieScheduleMinAggregateInputType = {
    id?: true;
    movieName?: true;
    screenName?: true;
    showTime?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MovieScheduleMaxAggregateInputType = {
    id?: true;
    movieName?: true;
    screenName?: true;
    showTime?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type MovieScheduleCountAggregateInputType = {
    id?: true;
    movieName?: true;
    screenName?: true;
    showTime?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type MovieScheduleAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which MovieSchedule to aggregate.
     */
    where?: MovieScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MovieSchedules to fetch.
     */
    orderBy?: MovieScheduleOrderByWithRelationInput | MovieScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MovieScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MovieSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MovieSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MovieSchedules
     **/
    _count?: true | MovieScheduleCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MovieScheduleMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MovieScheduleMaxAggregateInputType;
  };

  export type GetMovieScheduleAggregateType<T extends MovieScheduleAggregateArgs> = {
    [P in keyof T & keyof AggregateMovieSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovieSchedule[P]>
      : GetScalarType<T[P], AggregateMovieSchedule[P]>;
  };

  export type MovieScheduleGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: MovieScheduleWhereInput;
    orderBy?: MovieScheduleOrderByWithAggregationInput | MovieScheduleOrderByWithAggregationInput[];
    by: MovieScheduleScalarFieldEnum[] | MovieScheduleScalarFieldEnum;
    having?: MovieScheduleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MovieScheduleCountAggregateInputType | true;
    _min?: MovieScheduleMinAggregateInputType;
    _max?: MovieScheduleMaxAggregateInputType;
  };

  export type MovieScheduleGroupByOutputType = {
    id: string;
    movieName: string;
    screenName: string;
    showTime: Date;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: MovieScheduleCountAggregateOutputType | null;
    _min: MovieScheduleMinAggregateOutputType | null;
    _max: MovieScheduleMaxAggregateOutputType | null;
  };

  type GetMovieScheduleGroupByPayload<T extends MovieScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieScheduleGroupByOutputType, T['by']> & {
        [P in keyof T & keyof MovieScheduleGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], MovieScheduleGroupByOutputType[P]>
          : GetScalarType<T[P], MovieScheduleGroupByOutputType[P]>;
      }
    >
  >;

  export type MovieScheduleSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      movieName?: boolean;
      screenName?: boolean;
      showTime?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['movieSchedule']
  >;

  export type MovieScheduleSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      movieName?: boolean;
      screenName?: boolean;
      showTime?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['movieSchedule']
  >;

  export type MovieScheduleSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      movieName?: boolean;
      screenName?: boolean;
      showTime?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['movieSchedule']
  >;

  export type MovieScheduleSelectScalar = {
    id?: boolean;
    movieName?: boolean;
    screenName?: boolean;
    showTime?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type MovieScheduleOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    'id' | 'movieName' | 'screenName' | 'showTime' | 'status' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['movieSchedule']
  >;

  export type $MovieSchedulePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'MovieSchedule';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        movieName: string;
        screenName: string;
        showTime: Date;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['movieSchedule']
    >;
    composites: {};
  };

  type MovieScheduleGetPayload<S extends boolean | null | undefined | MovieScheduleDefaultArgs> =
    $Result.GetResult<Prisma.$MovieSchedulePayload, S>;

  type MovieScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieScheduleCountAggregateInputType | true;
    };

  export interface MovieScheduleDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['MovieSchedule'];
      meta: { name: 'MovieSchedule' };
    };
    /**
     * Find zero or one MovieSchedule that matches the filter.
     * @param {MovieScheduleFindUniqueArgs} args - Arguments to find a MovieSchedule
     * @example
     * // Get one MovieSchedule
     * const movieSchedule = await prisma.movieSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieScheduleFindUniqueArgs>(
      args: SelectSubset<T, MovieScheduleFindUniqueArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<
        Prisma.$MovieSchedulePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one MovieSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieScheduleFindUniqueOrThrowArgs} args - Arguments to find a MovieSchedule
     * @example
     * // Get one MovieSchedule
     * const movieSchedule = await prisma.movieSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieScheduleFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MovieScheduleFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<
        Prisma.$MovieSchedulePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MovieSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleFindFirstArgs} args - Arguments to find a MovieSchedule
     * @example
     * // Get one MovieSchedule
     * const movieSchedule = await prisma.movieSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieScheduleFindFirstArgs>(
      args?: SelectSubset<T, MovieScheduleFindFirstArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<
        Prisma.$MovieSchedulePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first MovieSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleFindFirstOrThrowArgs} args - Arguments to find a MovieSchedule
     * @example
     * // Get one MovieSchedule
     * const movieSchedule = await prisma.movieSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieScheduleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MovieScheduleFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<
        Prisma.$MovieSchedulePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more MovieSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MovieSchedules
     * const movieSchedules = await prisma.movieSchedule.findMany()
     *
     * // Get first 10 MovieSchedules
     * const movieSchedules = await prisma.movieSchedule.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const movieScheduleWithIdOnly = await prisma.movieSchedule.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MovieScheduleFindManyArgs>(
      args?: SelectSubset<T, MovieScheduleFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$MovieSchedulePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a MovieSchedule.
     * @param {MovieScheduleCreateArgs} args - Arguments to create a MovieSchedule.
     * @example
     * // Create one MovieSchedule
     * const MovieSchedule = await prisma.movieSchedule.create({
     *   data: {
     *     // ... data to create a MovieSchedule
     *   }
     * })
     *
     */
    create<T extends MovieScheduleCreateArgs>(
      args: SelectSubset<T, MovieScheduleCreateArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<Prisma.$MovieSchedulePayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many MovieSchedules.
     * @param {MovieScheduleCreateManyArgs} args - Arguments to create many MovieSchedules.
     * @example
     * // Create many MovieSchedules
     * const movieSchedule = await prisma.movieSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MovieScheduleCreateManyArgs>(
      args?: SelectSubset<T, MovieScheduleCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many MovieSchedules and returns the data saved in the database.
     * @param {MovieScheduleCreateManyAndReturnArgs} args - Arguments to create many MovieSchedules.
     * @example
     * // Create many MovieSchedules
     * const movieSchedule = await prisma.movieSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MovieSchedules and only return the `id`
     * const movieScheduleWithIdOnly = await prisma.movieSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MovieScheduleCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MovieScheduleCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MovieSchedulePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a MovieSchedule.
     * @param {MovieScheduleDeleteArgs} args - Arguments to delete one MovieSchedule.
     * @example
     * // Delete one MovieSchedule
     * const MovieSchedule = await prisma.movieSchedule.delete({
     *   where: {
     *     // ... filter to delete one MovieSchedule
     *   }
     * })
     *
     */
    delete<T extends MovieScheduleDeleteArgs>(
      args: SelectSubset<T, MovieScheduleDeleteArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<Prisma.$MovieSchedulePayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one MovieSchedule.
     * @param {MovieScheduleUpdateArgs} args - Arguments to update one MovieSchedule.
     * @example
     * // Update one MovieSchedule
     * const movieSchedule = await prisma.movieSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MovieScheduleUpdateArgs>(
      args: SelectSubset<T, MovieScheduleUpdateArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<Prisma.$MovieSchedulePayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more MovieSchedules.
     * @param {MovieScheduleDeleteManyArgs} args - Arguments to filter MovieSchedules to delete.
     * @example
     * // Delete a few MovieSchedules
     * const { count } = await prisma.movieSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MovieScheduleDeleteManyArgs>(
      args?: SelectSubset<T, MovieScheduleDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MovieSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MovieSchedules
     * const movieSchedule = await prisma.movieSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MovieScheduleUpdateManyArgs>(
      args: SelectSubset<T, MovieScheduleUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more MovieSchedules and returns the data updated in the database.
     * @param {MovieScheduleUpdateManyAndReturnArgs} args - Arguments to update many MovieSchedules.
     * @example
     * // Update many MovieSchedules
     * const movieSchedule = await prisma.movieSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MovieSchedules and only return the `id`
     * const movieScheduleWithIdOnly = await prisma.movieSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MovieScheduleUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MovieScheduleUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MovieSchedulePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one MovieSchedule.
     * @param {MovieScheduleUpsertArgs} args - Arguments to update or create a MovieSchedule.
     * @example
     * // Update or create a MovieSchedule
     * const movieSchedule = await prisma.movieSchedule.upsert({
     *   create: {
     *     // ... data to create a MovieSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MovieSchedule we want to update
     *   }
     * })
     */
    upsert<T extends MovieScheduleUpsertArgs>(
      args: SelectSubset<T, MovieScheduleUpsertArgs<ExtArgs>>
    ): Prisma__MovieScheduleClient<
      $Result.GetResult<Prisma.$MovieSchedulePayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of MovieSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleCountArgs} args - Arguments to filter MovieSchedules to count.
     * @example
     * // Count the number of MovieSchedules
     * const count = await prisma.movieSchedule.count({
     *   where: {
     *     // ... the filter for the MovieSchedules we want to count
     *   }
     * })
     **/
    count<T extends MovieScheduleCountArgs>(
      args?: Subset<T, MovieScheduleCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieScheduleCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a MovieSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MovieScheduleAggregateArgs>(
      args: Subset<T, MovieScheduleAggregateArgs>
    ): Prisma.PrismaPromise<GetMovieScheduleAggregateType<T>>;

    /**
     * Group by MovieSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MovieScheduleGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieScheduleGroupByArgs['orderBy'] }
        : { orderBy?: MovieScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, MovieScheduleGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetMovieScheduleGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MovieSchedule model
     */
    readonly fields: MovieScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MovieSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieScheduleClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the MovieSchedule model
   */
  interface MovieScheduleFieldRefs {
    readonly id: FieldRef<'MovieSchedule', 'String'>;
    readonly movieName: FieldRef<'MovieSchedule', 'String'>;
    readonly screenName: FieldRef<'MovieSchedule', 'String'>;
    readonly showTime: FieldRef<'MovieSchedule', 'DateTime'>;
    readonly status: FieldRef<'MovieSchedule', 'RecordStatus'>;
    readonly createdAt: FieldRef<'MovieSchedule', 'DateTime'>;
    readonly updatedAt: FieldRef<'MovieSchedule', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * MovieSchedule findUnique
   */
  export type MovieScheduleFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MovieSchedule to fetch.
     */
    where: MovieScheduleWhereUniqueInput;
  };

  /**
   * MovieSchedule findUniqueOrThrow
   */
  export type MovieScheduleFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MovieSchedule to fetch.
     */
    where: MovieScheduleWhereUniqueInput;
  };

  /**
   * MovieSchedule findFirst
   */
  export type MovieScheduleFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MovieSchedule to fetch.
     */
    where?: MovieScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MovieSchedules to fetch.
     */
    orderBy?: MovieScheduleOrderByWithRelationInput | MovieScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MovieSchedules.
     */
    cursor?: MovieScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MovieSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MovieSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MovieSchedules.
     */
    distinct?: MovieScheduleScalarFieldEnum | MovieScheduleScalarFieldEnum[];
  };

  /**
   * MovieSchedule findFirstOrThrow
   */
  export type MovieScheduleFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MovieSchedule to fetch.
     */
    where?: MovieScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MovieSchedules to fetch.
     */
    orderBy?: MovieScheduleOrderByWithRelationInput | MovieScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MovieSchedules.
     */
    cursor?: MovieScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MovieSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MovieSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MovieSchedules.
     */
    distinct?: MovieScheduleScalarFieldEnum | MovieScheduleScalarFieldEnum[];
  };

  /**
   * MovieSchedule findMany
   */
  export type MovieScheduleFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * Filter, which MovieSchedules to fetch.
     */
    where?: MovieScheduleWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MovieSchedules to fetch.
     */
    orderBy?: MovieScheduleOrderByWithRelationInput | MovieScheduleOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MovieSchedules.
     */
    cursor?: MovieScheduleWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MovieSchedules from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MovieSchedules.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MovieSchedules.
     */
    distinct?: MovieScheduleScalarFieldEnum | MovieScheduleScalarFieldEnum[];
  };

  /**
   * MovieSchedule create
   */
  export type MovieScheduleCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * The data needed to create a MovieSchedule.
     */
    data: XOR<MovieScheduleCreateInput, MovieScheduleUncheckedCreateInput>;
  };

  /**
   * MovieSchedule createMany
   */
  export type MovieScheduleCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many MovieSchedules.
     */
    data: MovieScheduleCreateManyInput | MovieScheduleCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * MovieSchedule createManyAndReturn
   */
  export type MovieScheduleCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * The data used to create many MovieSchedules.
     */
    data: MovieScheduleCreateManyInput | MovieScheduleCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * MovieSchedule update
   */
  export type MovieScheduleUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * The data needed to update a MovieSchedule.
     */
    data: XOR<MovieScheduleUpdateInput, MovieScheduleUncheckedUpdateInput>;
    /**
     * Choose, which MovieSchedule to update.
     */
    where: MovieScheduleWhereUniqueInput;
  };

  /**
   * MovieSchedule updateMany
   */
  export type MovieScheduleUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update MovieSchedules.
     */
    data: XOR<MovieScheduleUpdateManyMutationInput, MovieScheduleUncheckedUpdateManyInput>;
    /**
     * Filter which MovieSchedules to update
     */
    where?: MovieScheduleWhereInput;
    /**
     * Limit how many MovieSchedules to update.
     */
    limit?: number;
  };

  /**
   * MovieSchedule updateManyAndReturn
   */
  export type MovieScheduleUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * The data used to update MovieSchedules.
     */
    data: XOR<MovieScheduleUpdateManyMutationInput, MovieScheduleUncheckedUpdateManyInput>;
    /**
     * Filter which MovieSchedules to update
     */
    where?: MovieScheduleWhereInput;
    /**
     * Limit how many MovieSchedules to update.
     */
    limit?: number;
  };

  /**
   * MovieSchedule upsert
   */
  export type MovieScheduleUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * The filter to search for the MovieSchedule to update in case it exists.
     */
    where: MovieScheduleWhereUniqueInput;
    /**
     * In case the MovieSchedule found by the `where` argument doesn't exist, create a new MovieSchedule with this data.
     */
    create: XOR<MovieScheduleCreateInput, MovieScheduleUncheckedCreateInput>;
    /**
     * In case the MovieSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieScheduleUpdateInput, MovieScheduleUncheckedUpdateInput>;
  };

  /**
   * MovieSchedule delete
   */
  export type MovieScheduleDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
    /**
     * Filter which MovieSchedule to delete.
     */
    where: MovieScheduleWhereUniqueInput;
  };

  /**
   * MovieSchedule deleteMany
   */
  export type MovieScheduleDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which MovieSchedules to delete
     */
    where?: MovieScheduleWhereInput;
    /**
     * Limit how many MovieSchedules to delete.
     */
    limit?: number;
  };

  /**
   * MovieSchedule without action
   */
  export type MovieScheduleDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the MovieSchedule
     */
    select?: MovieScheduleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MovieSchedule
     */
    omit?: MovieScheduleOmit<ExtArgs> | null;
  };

  /**
   * Model ItemSalesTarget
   */

  export type AggregateItemSalesTarget = {
    _count: ItemSalesTargetCountAggregateOutputType | null;
    _avg: ItemSalesTargetAvgAggregateOutputType | null;
    _sum: ItemSalesTargetSumAggregateOutputType | null;
    _min: ItemSalesTargetMinAggregateOutputType | null;
    _max: ItemSalesTargetMaxAggregateOutputType | null;
  };

  export type ItemSalesTargetAvgAggregateOutputType = {
    dailyTarget: number | null;
    weeklyTarget: number | null;
    monthlyTarget: number | null;
  };

  export type ItemSalesTargetSumAggregateOutputType = {
    dailyTarget: number | null;
    weeklyTarget: number | null;
    monthlyTarget: number | null;
  };

  export type ItemSalesTargetMinAggregateOutputType = {
    id: string | null;
    itemName: string | null;
    itemCode: string | null;
    dailyTarget: number | null;
    weeklyTarget: number | null;
    monthlyTarget: number | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ItemSalesTargetMaxAggregateOutputType = {
    id: string | null;
    itemName: string | null;
    itemCode: string | null;
    dailyTarget: number | null;
    weeklyTarget: number | null;
    monthlyTarget: number | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ItemSalesTargetCountAggregateOutputType = {
    id: number;
    itemName: number;
    itemCode: number;
    dailyTarget: number;
    weeklyTarget: number;
    monthlyTarget: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ItemSalesTargetAvgAggregateInputType = {
    dailyTarget?: true;
    weeklyTarget?: true;
    monthlyTarget?: true;
  };

  export type ItemSalesTargetSumAggregateInputType = {
    dailyTarget?: true;
    weeklyTarget?: true;
    monthlyTarget?: true;
  };

  export type ItemSalesTargetMinAggregateInputType = {
    id?: true;
    itemName?: true;
    itemCode?: true;
    dailyTarget?: true;
    weeklyTarget?: true;
    monthlyTarget?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ItemSalesTargetMaxAggregateInputType = {
    id?: true;
    itemName?: true;
    itemCode?: true;
    dailyTarget?: true;
    weeklyTarget?: true;
    monthlyTarget?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ItemSalesTargetCountAggregateInputType = {
    id?: true;
    itemName?: true;
    itemCode?: true;
    dailyTarget?: true;
    weeklyTarget?: true;
    monthlyTarget?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ItemSalesTargetAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which ItemSalesTarget to aggregate.
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ItemSalesTargets to fetch.
     */
    orderBy?: ItemSalesTargetOrderByWithRelationInput | ItemSalesTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ItemSalesTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ItemSalesTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ItemSalesTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ItemSalesTargets
     **/
    _count?: true | ItemSalesTargetCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ItemSalesTargetAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ItemSalesTargetSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ItemSalesTargetMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ItemSalesTargetMaxAggregateInputType;
  };

  export type GetItemSalesTargetAggregateType<T extends ItemSalesTargetAggregateArgs> = {
    [P in keyof T & keyof AggregateItemSalesTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemSalesTarget[P]>
      : GetScalarType<T[P], AggregateItemSalesTarget[P]>;
  };

  export type ItemSalesTargetGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: ItemSalesTargetWhereInput;
    orderBy?:
      | ItemSalesTargetOrderByWithAggregationInput
      | ItemSalesTargetOrderByWithAggregationInput[];
    by: ItemSalesTargetScalarFieldEnum[] | ItemSalesTargetScalarFieldEnum;
    having?: ItemSalesTargetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ItemSalesTargetCountAggregateInputType | true;
    _avg?: ItemSalesTargetAvgAggregateInputType;
    _sum?: ItemSalesTargetSumAggregateInputType;
    _min?: ItemSalesTargetMinAggregateInputType;
    _max?: ItemSalesTargetMaxAggregateInputType;
  };

  export type ItemSalesTargetGroupByOutputType = {
    id: string;
    itemName: string;
    itemCode: string | null;
    dailyTarget: number | null;
    weeklyTarget: number | null;
    monthlyTarget: number | null;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ItemSalesTargetCountAggregateOutputType | null;
    _avg: ItemSalesTargetAvgAggregateOutputType | null;
    _sum: ItemSalesTargetSumAggregateOutputType | null;
    _min: ItemSalesTargetMinAggregateOutputType | null;
    _max: ItemSalesTargetMaxAggregateOutputType | null;
  };

  type GetItemSalesTargetGroupByPayload<T extends ItemSalesTargetGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ItemSalesTargetGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ItemSalesTargetGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemSalesTargetGroupByOutputType[P]>
            : GetScalarType<T[P], ItemSalesTargetGroupByOutputType[P]>;
        }
      >
    >;

  export type ItemSalesTargetSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      itemName?: boolean;
      itemCode?: boolean;
      dailyTarget?: boolean;
      weeklyTarget?: boolean;
      monthlyTarget?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['itemSalesTarget']
  >;

  export type ItemSalesTargetSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      itemName?: boolean;
      itemCode?: boolean;
      dailyTarget?: boolean;
      weeklyTarget?: boolean;
      monthlyTarget?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['itemSalesTarget']
  >;

  export type ItemSalesTargetSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      itemName?: boolean;
      itemCode?: boolean;
      dailyTarget?: boolean;
      weeklyTarget?: boolean;
      monthlyTarget?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['itemSalesTarget']
  >;

  export type ItemSalesTargetSelectScalar = {
    id?: boolean;
    itemName?: boolean;
    itemCode?: boolean;
    dailyTarget?: boolean;
    weeklyTarget?: boolean;
    monthlyTarget?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ItemSalesTargetOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    | 'id'
    | 'itemName'
    | 'itemCode'
    | 'dailyTarget'
    | 'weeklyTarget'
    | 'monthlyTarget'
    | 'status'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['itemSalesTarget']
  >;

  export type $ItemSalesTargetPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'ItemSalesTarget';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        itemName: string;
        itemCode: string | null;
        dailyTarget: number | null;
        weeklyTarget: number | null;
        monthlyTarget: number | null;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['itemSalesTarget']
    >;
    composites: {};
  };

  type ItemSalesTargetGetPayload<
    S extends boolean | null | undefined | ItemSalesTargetDefaultArgs
  > = $Result.GetResult<Prisma.$ItemSalesTargetPayload, S>;

  type ItemSalesTargetCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<ItemSalesTargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ItemSalesTargetCountAggregateInputType | true;
  };

  export interface ItemSalesTargetDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ItemSalesTarget'];
      meta: { name: 'ItemSalesTarget' };
    };
    /**
     * Find zero or one ItemSalesTarget that matches the filter.
     * @param {ItemSalesTargetFindUniqueArgs} args - Arguments to find a ItemSalesTarget
     * @example
     * // Get one ItemSalesTarget
     * const itemSalesTarget = await prisma.itemSalesTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemSalesTargetFindUniqueArgs>(
      args: SelectSubset<T, ItemSalesTargetFindUniqueArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<
        Prisma.$ItemSalesTargetPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ItemSalesTarget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemSalesTargetFindUniqueOrThrowArgs} args - Arguments to find a ItemSalesTarget
     * @example
     * // Get one ItemSalesTarget
     * const itemSalesTarget = await prisma.itemSalesTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemSalesTargetFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ItemSalesTargetFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<
        Prisma.$ItemSalesTargetPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ItemSalesTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetFindFirstArgs} args - Arguments to find a ItemSalesTarget
     * @example
     * // Get one ItemSalesTarget
     * const itemSalesTarget = await prisma.itemSalesTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemSalesTargetFindFirstArgs>(
      args?: SelectSubset<T, ItemSalesTargetFindFirstArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<
        Prisma.$ItemSalesTargetPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ItemSalesTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetFindFirstOrThrowArgs} args - Arguments to find a ItemSalesTarget
     * @example
     * // Get one ItemSalesTarget
     * const itemSalesTarget = await prisma.itemSalesTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemSalesTargetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ItemSalesTargetFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<
        Prisma.$ItemSalesTargetPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ItemSalesTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemSalesTargets
     * const itemSalesTargets = await prisma.itemSalesTarget.findMany()
     *
     * // Get first 10 ItemSalesTargets
     * const itemSalesTargets = await prisma.itemSalesTarget.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const itemSalesTargetWithIdOnly = await prisma.itemSalesTarget.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ItemSalesTargetFindManyArgs>(
      args?: SelectSubset<T, ItemSalesTargetFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$ItemSalesTargetPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a ItemSalesTarget.
     * @param {ItemSalesTargetCreateArgs} args - Arguments to create a ItemSalesTarget.
     * @example
     * // Create one ItemSalesTarget
     * const ItemSalesTarget = await prisma.itemSalesTarget.create({
     *   data: {
     *     // ... data to create a ItemSalesTarget
     *   }
     * })
     *
     */
    create<T extends ItemSalesTargetCreateArgs>(
      args: SelectSubset<T, ItemSalesTargetCreateArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<Prisma.$ItemSalesTargetPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ItemSalesTargets.
     * @param {ItemSalesTargetCreateManyArgs} args - Arguments to create many ItemSalesTargets.
     * @example
     * // Create many ItemSalesTargets
     * const itemSalesTarget = await prisma.itemSalesTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ItemSalesTargetCreateManyArgs>(
      args?: SelectSubset<T, ItemSalesTargetCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ItemSalesTargets and returns the data saved in the database.
     * @param {ItemSalesTargetCreateManyAndReturnArgs} args - Arguments to create many ItemSalesTargets.
     * @example
     * // Create many ItemSalesTargets
     * const itemSalesTarget = await prisma.itemSalesTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ItemSalesTargets and only return the `id`
     * const itemSalesTargetWithIdOnly = await prisma.itemSalesTarget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ItemSalesTargetCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ItemSalesTargetCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ItemSalesTargetPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ItemSalesTarget.
     * @param {ItemSalesTargetDeleteArgs} args - Arguments to delete one ItemSalesTarget.
     * @example
     * // Delete one ItemSalesTarget
     * const ItemSalesTarget = await prisma.itemSalesTarget.delete({
     *   where: {
     *     // ... filter to delete one ItemSalesTarget
     *   }
     * })
     *
     */
    delete<T extends ItemSalesTargetDeleteArgs>(
      args: SelectSubset<T, ItemSalesTargetDeleteArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<Prisma.$ItemSalesTargetPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ItemSalesTarget.
     * @param {ItemSalesTargetUpdateArgs} args - Arguments to update one ItemSalesTarget.
     * @example
     * // Update one ItemSalesTarget
     * const itemSalesTarget = await prisma.itemSalesTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ItemSalesTargetUpdateArgs>(
      args: SelectSubset<T, ItemSalesTargetUpdateArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<Prisma.$ItemSalesTargetPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ItemSalesTargets.
     * @param {ItemSalesTargetDeleteManyArgs} args - Arguments to filter ItemSalesTargets to delete.
     * @example
     * // Delete a few ItemSalesTargets
     * const { count } = await prisma.itemSalesTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ItemSalesTargetDeleteManyArgs>(
      args?: SelectSubset<T, ItemSalesTargetDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ItemSalesTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemSalesTargets
     * const itemSalesTarget = await prisma.itemSalesTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ItemSalesTargetUpdateManyArgs>(
      args: SelectSubset<T, ItemSalesTargetUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ItemSalesTargets and returns the data updated in the database.
     * @param {ItemSalesTargetUpdateManyAndReturnArgs} args - Arguments to update many ItemSalesTargets.
     * @example
     * // Update many ItemSalesTargets
     * const itemSalesTarget = await prisma.itemSalesTarget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ItemSalesTargets and only return the `id`
     * const itemSalesTargetWithIdOnly = await prisma.itemSalesTarget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ItemSalesTargetUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ItemSalesTargetUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ItemSalesTargetPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ItemSalesTarget.
     * @param {ItemSalesTargetUpsertArgs} args - Arguments to update or create a ItemSalesTarget.
     * @example
     * // Update or create a ItemSalesTarget
     * const itemSalesTarget = await prisma.itemSalesTarget.upsert({
     *   create: {
     *     // ... data to create a ItemSalesTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemSalesTarget we want to update
     *   }
     * })
     */
    upsert<T extends ItemSalesTargetUpsertArgs>(
      args: SelectSubset<T, ItemSalesTargetUpsertArgs<ExtArgs>>
    ): Prisma__ItemSalesTargetClient<
      $Result.GetResult<Prisma.$ItemSalesTargetPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ItemSalesTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetCountArgs} args - Arguments to filter ItemSalesTargets to count.
     * @example
     * // Count the number of ItemSalesTargets
     * const count = await prisma.itemSalesTarget.count({
     *   where: {
     *     // ... the filter for the ItemSalesTargets we want to count
     *   }
     * })
     **/
    count<T extends ItemSalesTargetCountArgs>(
      args?: Subset<T, ItemSalesTargetCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemSalesTargetCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ItemSalesTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ItemSalesTargetAggregateArgs>(
      args: Subset<T, ItemSalesTargetAggregateArgs>
    ): Prisma.PrismaPromise<GetItemSalesTargetAggregateType<T>>;

    /**
     * Group by ItemSalesTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemSalesTargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ItemSalesTargetGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemSalesTargetGroupByArgs['orderBy'] }
        : { orderBy?: ItemSalesTargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, ItemSalesTargetGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetItemSalesTargetGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ItemSalesTarget model
     */
    readonly fields: ItemSalesTargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemSalesTarget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemSalesTargetClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ItemSalesTarget model
   */
  interface ItemSalesTargetFieldRefs {
    readonly id: FieldRef<'ItemSalesTarget', 'String'>;
    readonly itemName: FieldRef<'ItemSalesTarget', 'String'>;
    readonly itemCode: FieldRef<'ItemSalesTarget', 'String'>;
    readonly dailyTarget: FieldRef<'ItemSalesTarget', 'Int'>;
    readonly weeklyTarget: FieldRef<'ItemSalesTarget', 'Int'>;
    readonly monthlyTarget: FieldRef<'ItemSalesTarget', 'Int'>;
    readonly status: FieldRef<'ItemSalesTarget', 'RecordStatus'>;
    readonly createdAt: FieldRef<'ItemSalesTarget', 'DateTime'>;
    readonly updatedAt: FieldRef<'ItemSalesTarget', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ItemSalesTarget findUnique
   */
  export type ItemSalesTargetFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * Filter, which ItemSalesTarget to fetch.
     */
    where: ItemSalesTargetWhereUniqueInput;
  };

  /**
   * ItemSalesTarget findUniqueOrThrow
   */
  export type ItemSalesTargetFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * Filter, which ItemSalesTarget to fetch.
     */
    where: ItemSalesTargetWhereUniqueInput;
  };

  /**
   * ItemSalesTarget findFirst
   */
  export type ItemSalesTargetFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * Filter, which ItemSalesTarget to fetch.
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ItemSalesTargets to fetch.
     */
    orderBy?: ItemSalesTargetOrderByWithRelationInput | ItemSalesTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ItemSalesTargets.
     */
    cursor?: ItemSalesTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ItemSalesTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ItemSalesTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ItemSalesTargets.
     */
    distinct?: ItemSalesTargetScalarFieldEnum | ItemSalesTargetScalarFieldEnum[];
  };

  /**
   * ItemSalesTarget findFirstOrThrow
   */
  export type ItemSalesTargetFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * Filter, which ItemSalesTarget to fetch.
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ItemSalesTargets to fetch.
     */
    orderBy?: ItemSalesTargetOrderByWithRelationInput | ItemSalesTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ItemSalesTargets.
     */
    cursor?: ItemSalesTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ItemSalesTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ItemSalesTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ItemSalesTargets.
     */
    distinct?: ItemSalesTargetScalarFieldEnum | ItemSalesTargetScalarFieldEnum[];
  };

  /**
   * ItemSalesTarget findMany
   */
  export type ItemSalesTargetFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * Filter, which ItemSalesTargets to fetch.
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ItemSalesTargets to fetch.
     */
    orderBy?: ItemSalesTargetOrderByWithRelationInput | ItemSalesTargetOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ItemSalesTargets.
     */
    cursor?: ItemSalesTargetWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ItemSalesTargets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ItemSalesTargets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ItemSalesTargets.
     */
    distinct?: ItemSalesTargetScalarFieldEnum | ItemSalesTargetScalarFieldEnum[];
  };

  /**
   * ItemSalesTarget create
   */
  export type ItemSalesTargetCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * The data needed to create a ItemSalesTarget.
     */
    data: XOR<ItemSalesTargetCreateInput, ItemSalesTargetUncheckedCreateInput>;
  };

  /**
   * ItemSalesTarget createMany
   */
  export type ItemSalesTargetCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many ItemSalesTargets.
     */
    data: ItemSalesTargetCreateManyInput | ItemSalesTargetCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ItemSalesTarget createManyAndReturn
   */
  export type ItemSalesTargetCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * The data used to create many ItemSalesTargets.
     */
    data: ItemSalesTargetCreateManyInput | ItemSalesTargetCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ItemSalesTarget update
   */
  export type ItemSalesTargetUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * The data needed to update a ItemSalesTarget.
     */
    data: XOR<ItemSalesTargetUpdateInput, ItemSalesTargetUncheckedUpdateInput>;
    /**
     * Choose, which ItemSalesTarget to update.
     */
    where: ItemSalesTargetWhereUniqueInput;
  };

  /**
   * ItemSalesTarget updateMany
   */
  export type ItemSalesTargetUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update ItemSalesTargets.
     */
    data: XOR<ItemSalesTargetUpdateManyMutationInput, ItemSalesTargetUncheckedUpdateManyInput>;
    /**
     * Filter which ItemSalesTargets to update
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * Limit how many ItemSalesTargets to update.
     */
    limit?: number;
  };

  /**
   * ItemSalesTarget updateManyAndReturn
   */
  export type ItemSalesTargetUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * The data used to update ItemSalesTargets.
     */
    data: XOR<ItemSalesTargetUpdateManyMutationInput, ItemSalesTargetUncheckedUpdateManyInput>;
    /**
     * Filter which ItemSalesTargets to update
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * Limit how many ItemSalesTargets to update.
     */
    limit?: number;
  };

  /**
   * ItemSalesTarget upsert
   */
  export type ItemSalesTargetUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * The filter to search for the ItemSalesTarget to update in case it exists.
     */
    where: ItemSalesTargetWhereUniqueInput;
    /**
     * In case the ItemSalesTarget found by the `where` argument doesn't exist, create a new ItemSalesTarget with this data.
     */
    create: XOR<ItemSalesTargetCreateInput, ItemSalesTargetUncheckedCreateInput>;
    /**
     * In case the ItemSalesTarget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemSalesTargetUpdateInput, ItemSalesTargetUncheckedUpdateInput>;
  };

  /**
   * ItemSalesTarget delete
   */
  export type ItemSalesTargetDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
    /**
     * Filter which ItemSalesTarget to delete.
     */
    where: ItemSalesTargetWhereUniqueInput;
  };

  /**
   * ItemSalesTarget deleteMany
   */
  export type ItemSalesTargetDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which ItemSalesTargets to delete
     */
    where?: ItemSalesTargetWhereInput;
    /**
     * Limit how many ItemSalesTargets to delete.
     */
    limit?: number;
  };

  /**
   * ItemSalesTarget without action
   */
  export type ItemSalesTargetDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ItemSalesTarget
     */
    select?: ItemSalesTargetSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ItemSalesTarget
     */
    omit?: ItemSalesTargetOmit<ExtArgs> | null;
  };

  /**
   * Model ConcessionPriceItem
   */

  export type AggregateConcessionPriceItem = {
    _count: ConcessionPriceItemCountAggregateOutputType | null;
    _avg: ConcessionPriceItemAvgAggregateOutputType | null;
    _sum: ConcessionPriceItemSumAggregateOutputType | null;
    _min: ConcessionPriceItemMinAggregateOutputType | null;
    _max: ConcessionPriceItemMaxAggregateOutputType | null;
  };

  export type ConcessionPriceItemAvgAggregateOutputType = {
    price: number | null;
    sortOrder: number | null;
  };

  export type ConcessionPriceItemSumAggregateOutputType = {
    price: number | null;
    sortOrder: number | null;
  };

  export type ConcessionPriceItemMinAggregateOutputType = {
    id: string | null;
    itemName: string | null;
    category: string | null;
    price: number | null;
    sortOrder: number | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ConcessionPriceItemMaxAggregateOutputType = {
    id: string | null;
    itemName: string | null;
    category: string | null;
    price: number | null;
    sortOrder: number | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ConcessionPriceItemCountAggregateOutputType = {
    id: number;
    itemName: number;
    category: number;
    price: number;
    sortOrder: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ConcessionPriceItemAvgAggregateInputType = {
    price?: true;
    sortOrder?: true;
  };

  export type ConcessionPriceItemSumAggregateInputType = {
    price?: true;
    sortOrder?: true;
  };

  export type ConcessionPriceItemMinAggregateInputType = {
    id?: true;
    itemName?: true;
    category?: true;
    price?: true;
    sortOrder?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ConcessionPriceItemMaxAggregateInputType = {
    id?: true;
    itemName?: true;
    category?: true;
    price?: true;
    sortOrder?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ConcessionPriceItemCountAggregateInputType = {
    id?: true;
    itemName?: true;
    category?: true;
    price?: true;
    sortOrder?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ConcessionPriceItemAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which ConcessionPriceItem to aggregate.
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConcessionPriceItems to fetch.
     */
    orderBy?:
      | ConcessionPriceItemOrderByWithRelationInput
      | ConcessionPriceItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ConcessionPriceItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConcessionPriceItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConcessionPriceItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ConcessionPriceItems
     **/
    _count?: true | ConcessionPriceItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ConcessionPriceItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ConcessionPriceItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ConcessionPriceItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ConcessionPriceItemMaxAggregateInputType;
  };

  export type GetConcessionPriceItemAggregateType<T extends ConcessionPriceItemAggregateArgs> = {
    [P in keyof T & keyof AggregateConcessionPriceItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConcessionPriceItem[P]>
      : GetScalarType<T[P], AggregateConcessionPriceItem[P]>;
  };

  export type ConcessionPriceItemGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: ConcessionPriceItemWhereInput;
    orderBy?:
      | ConcessionPriceItemOrderByWithAggregationInput
      | ConcessionPriceItemOrderByWithAggregationInput[];
    by: ConcessionPriceItemScalarFieldEnum[] | ConcessionPriceItemScalarFieldEnum;
    having?: ConcessionPriceItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConcessionPriceItemCountAggregateInputType | true;
    _avg?: ConcessionPriceItemAvgAggregateInputType;
    _sum?: ConcessionPriceItemSumAggregateInputType;
    _min?: ConcessionPriceItemMinAggregateInputType;
    _max?: ConcessionPriceItemMaxAggregateInputType;
  };

  export type ConcessionPriceItemGroupByOutputType = {
    id: string;
    itemName: string;
    category: string | null;
    price: number;
    sortOrder: number;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: ConcessionPriceItemCountAggregateOutputType | null;
    _avg: ConcessionPriceItemAvgAggregateOutputType | null;
    _sum: ConcessionPriceItemSumAggregateOutputType | null;
    _min: ConcessionPriceItemMinAggregateOutputType | null;
    _max: ConcessionPriceItemMaxAggregateOutputType | null;
  };

  type GetConcessionPriceItemGroupByPayload<T extends ConcessionPriceItemGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ConcessionPriceItemGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ConcessionPriceItemGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConcessionPriceItemGroupByOutputType[P]>
            : GetScalarType<T[P], ConcessionPriceItemGroupByOutputType[P]>;
        }
      >
    >;

  export type ConcessionPriceItemSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      itemName?: boolean;
      category?: boolean;
      price?: boolean;
      sortOrder?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['concessionPriceItem']
  >;

  export type ConcessionPriceItemSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      itemName?: boolean;
      category?: boolean;
      price?: boolean;
      sortOrder?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['concessionPriceItem']
  >;

  export type ConcessionPriceItemSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      itemName?: boolean;
      category?: boolean;
      price?: boolean;
      sortOrder?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['concessionPriceItem']
  >;

  export type ConcessionPriceItemSelectScalar = {
    id?: boolean;
    itemName?: boolean;
    category?: boolean;
    price?: boolean;
    sortOrder?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ConcessionPriceItemOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    'id' | 'itemName' | 'category' | 'price' | 'sortOrder' | 'status' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['concessionPriceItem']
  >;

  export type $ConcessionPriceItemPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'ConcessionPriceItem';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        itemName: string;
        category: string | null;
        price: number;
        sortOrder: number;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['concessionPriceItem']
    >;
    composites: {};
  };

  type ConcessionPriceItemGetPayload<
    S extends boolean | null | undefined | ConcessionPriceItemDefaultArgs
  > = $Result.GetResult<Prisma.$ConcessionPriceItemPayload, S>;

  type ConcessionPriceItemCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<ConcessionPriceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConcessionPriceItemCountAggregateInputType | true;
  };

  export interface ConcessionPriceItemDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ConcessionPriceItem'];
      meta: { name: 'ConcessionPriceItem' };
    };
    /**
     * Find zero or one ConcessionPriceItem that matches the filter.
     * @param {ConcessionPriceItemFindUniqueArgs} args - Arguments to find a ConcessionPriceItem
     * @example
     * // Get one ConcessionPriceItem
     * const concessionPriceItem = await prisma.concessionPriceItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConcessionPriceItemFindUniqueArgs>(
      args: SelectSubset<T, ConcessionPriceItemFindUniqueArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ConcessionPriceItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConcessionPriceItemFindUniqueOrThrowArgs} args - Arguments to find a ConcessionPriceItem
     * @example
     * // Get one ConcessionPriceItem
     * const concessionPriceItem = await prisma.concessionPriceItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConcessionPriceItemFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ConcessionPriceItemFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ConcessionPriceItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemFindFirstArgs} args - Arguments to find a ConcessionPriceItem
     * @example
     * // Get one ConcessionPriceItem
     * const concessionPriceItem = await prisma.concessionPriceItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConcessionPriceItemFindFirstArgs>(
      args?: SelectSubset<T, ConcessionPriceItemFindFirstArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ConcessionPriceItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemFindFirstOrThrowArgs} args - Arguments to find a ConcessionPriceItem
     * @example
     * // Get one ConcessionPriceItem
     * const concessionPriceItem = await prisma.concessionPriceItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConcessionPriceItemFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ConcessionPriceItemFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ConcessionPriceItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConcessionPriceItems
     * const concessionPriceItems = await prisma.concessionPriceItem.findMany()
     *
     * // Get first 10 ConcessionPriceItems
     * const concessionPriceItems = await prisma.concessionPriceItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const concessionPriceItemWithIdOnly = await prisma.concessionPriceItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ConcessionPriceItemFindManyArgs>(
      args?: SelectSubset<T, ConcessionPriceItemFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ConcessionPriceItem.
     * @param {ConcessionPriceItemCreateArgs} args - Arguments to create a ConcessionPriceItem.
     * @example
     * // Create one ConcessionPriceItem
     * const ConcessionPriceItem = await prisma.concessionPriceItem.create({
     *   data: {
     *     // ... data to create a ConcessionPriceItem
     *   }
     * })
     *
     */
    create<T extends ConcessionPriceItemCreateArgs>(
      args: SelectSubset<T, ConcessionPriceItemCreateArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ConcessionPriceItems.
     * @param {ConcessionPriceItemCreateManyArgs} args - Arguments to create many ConcessionPriceItems.
     * @example
     * // Create many ConcessionPriceItems
     * const concessionPriceItem = await prisma.concessionPriceItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ConcessionPriceItemCreateManyArgs>(
      args?: SelectSubset<T, ConcessionPriceItemCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ConcessionPriceItems and returns the data saved in the database.
     * @param {ConcessionPriceItemCreateManyAndReturnArgs} args - Arguments to create many ConcessionPriceItems.
     * @example
     * // Create many ConcessionPriceItems
     * const concessionPriceItem = await prisma.concessionPriceItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ConcessionPriceItems and only return the `id`
     * const concessionPriceItemWithIdOnly = await prisma.concessionPriceItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ConcessionPriceItemCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ConcessionPriceItemCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ConcessionPriceItem.
     * @param {ConcessionPriceItemDeleteArgs} args - Arguments to delete one ConcessionPriceItem.
     * @example
     * // Delete one ConcessionPriceItem
     * const ConcessionPriceItem = await prisma.concessionPriceItem.delete({
     *   where: {
     *     // ... filter to delete one ConcessionPriceItem
     *   }
     * })
     *
     */
    delete<T extends ConcessionPriceItemDeleteArgs>(
      args: SelectSubset<T, ConcessionPriceItemDeleteArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ConcessionPriceItem.
     * @param {ConcessionPriceItemUpdateArgs} args - Arguments to update one ConcessionPriceItem.
     * @example
     * // Update one ConcessionPriceItem
     * const concessionPriceItem = await prisma.concessionPriceItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ConcessionPriceItemUpdateArgs>(
      args: SelectSubset<T, ConcessionPriceItemUpdateArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ConcessionPriceItems.
     * @param {ConcessionPriceItemDeleteManyArgs} args - Arguments to filter ConcessionPriceItems to delete.
     * @example
     * // Delete a few ConcessionPriceItems
     * const { count } = await prisma.concessionPriceItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ConcessionPriceItemDeleteManyArgs>(
      args?: SelectSubset<T, ConcessionPriceItemDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ConcessionPriceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConcessionPriceItems
     * const concessionPriceItem = await prisma.concessionPriceItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ConcessionPriceItemUpdateManyArgs>(
      args: SelectSubset<T, ConcessionPriceItemUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ConcessionPriceItems and returns the data updated in the database.
     * @param {ConcessionPriceItemUpdateManyAndReturnArgs} args - Arguments to update many ConcessionPriceItems.
     * @example
     * // Update many ConcessionPriceItems
     * const concessionPriceItem = await prisma.concessionPriceItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ConcessionPriceItems and only return the `id`
     * const concessionPriceItemWithIdOnly = await prisma.concessionPriceItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ConcessionPriceItemUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ConcessionPriceItemUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ConcessionPriceItem.
     * @param {ConcessionPriceItemUpsertArgs} args - Arguments to update or create a ConcessionPriceItem.
     * @example
     * // Update or create a ConcessionPriceItem
     * const concessionPriceItem = await prisma.concessionPriceItem.upsert({
     *   create: {
     *     // ... data to create a ConcessionPriceItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConcessionPriceItem we want to update
     *   }
     * })
     */
    upsert<T extends ConcessionPriceItemUpsertArgs>(
      args: SelectSubset<T, ConcessionPriceItemUpsertArgs<ExtArgs>>
    ): Prisma__ConcessionPriceItemClient<
      $Result.GetResult<
        Prisma.$ConcessionPriceItemPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ConcessionPriceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemCountArgs} args - Arguments to filter ConcessionPriceItems to count.
     * @example
     * // Count the number of ConcessionPriceItems
     * const count = await prisma.concessionPriceItem.count({
     *   where: {
     *     // ... the filter for the ConcessionPriceItems we want to count
     *   }
     * })
     **/
    count<T extends ConcessionPriceItemCountArgs>(
      args?: Subset<T, ConcessionPriceItemCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConcessionPriceItemCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ConcessionPriceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ConcessionPriceItemAggregateArgs>(
      args: Subset<T, ConcessionPriceItemAggregateArgs>
    ): Prisma.PrismaPromise<GetConcessionPriceItemAggregateType<T>>;

    /**
     * Group by ConcessionPriceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConcessionPriceItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ConcessionPriceItemGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConcessionPriceItemGroupByArgs['orderBy'] }
        : { orderBy?: ConcessionPriceItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, ConcessionPriceItemGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetConcessionPriceItemGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ConcessionPriceItem model
     */
    readonly fields: ConcessionPriceItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConcessionPriceItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConcessionPriceItemClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ConcessionPriceItem model
   */
  interface ConcessionPriceItemFieldRefs {
    readonly id: FieldRef<'ConcessionPriceItem', 'String'>;
    readonly itemName: FieldRef<'ConcessionPriceItem', 'String'>;
    readonly category: FieldRef<'ConcessionPriceItem', 'String'>;
    readonly price: FieldRef<'ConcessionPriceItem', 'Float'>;
    readonly sortOrder: FieldRef<'ConcessionPriceItem', 'Int'>;
    readonly status: FieldRef<'ConcessionPriceItem', 'RecordStatus'>;
    readonly createdAt: FieldRef<'ConcessionPriceItem', 'DateTime'>;
    readonly updatedAt: FieldRef<'ConcessionPriceItem', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ConcessionPriceItem findUnique
   */
  export type ConcessionPriceItemFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * Filter, which ConcessionPriceItem to fetch.
     */
    where: ConcessionPriceItemWhereUniqueInput;
  };

  /**
   * ConcessionPriceItem findUniqueOrThrow
   */
  export type ConcessionPriceItemFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * Filter, which ConcessionPriceItem to fetch.
     */
    where: ConcessionPriceItemWhereUniqueInput;
  };

  /**
   * ConcessionPriceItem findFirst
   */
  export type ConcessionPriceItemFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * Filter, which ConcessionPriceItem to fetch.
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConcessionPriceItems to fetch.
     */
    orderBy?:
      | ConcessionPriceItemOrderByWithRelationInput
      | ConcessionPriceItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ConcessionPriceItems.
     */
    cursor?: ConcessionPriceItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConcessionPriceItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConcessionPriceItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConcessionPriceItems.
     */
    distinct?: ConcessionPriceItemScalarFieldEnum | ConcessionPriceItemScalarFieldEnum[];
  };

  /**
   * ConcessionPriceItem findFirstOrThrow
   */
  export type ConcessionPriceItemFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * Filter, which ConcessionPriceItem to fetch.
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConcessionPriceItems to fetch.
     */
    orderBy?:
      | ConcessionPriceItemOrderByWithRelationInput
      | ConcessionPriceItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ConcessionPriceItems.
     */
    cursor?: ConcessionPriceItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConcessionPriceItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConcessionPriceItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConcessionPriceItems.
     */
    distinct?: ConcessionPriceItemScalarFieldEnum | ConcessionPriceItemScalarFieldEnum[];
  };

  /**
   * ConcessionPriceItem findMany
   */
  export type ConcessionPriceItemFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * Filter, which ConcessionPriceItems to fetch.
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConcessionPriceItems to fetch.
     */
    orderBy?:
      | ConcessionPriceItemOrderByWithRelationInput
      | ConcessionPriceItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ConcessionPriceItems.
     */
    cursor?: ConcessionPriceItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConcessionPriceItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConcessionPriceItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConcessionPriceItems.
     */
    distinct?: ConcessionPriceItemScalarFieldEnum | ConcessionPriceItemScalarFieldEnum[];
  };

  /**
   * ConcessionPriceItem create
   */
  export type ConcessionPriceItemCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * The data needed to create a ConcessionPriceItem.
     */
    data: XOR<ConcessionPriceItemCreateInput, ConcessionPriceItemUncheckedCreateInput>;
  };

  /**
   * ConcessionPriceItem createMany
   */
  export type ConcessionPriceItemCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many ConcessionPriceItems.
     */
    data: ConcessionPriceItemCreateManyInput | ConcessionPriceItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ConcessionPriceItem createManyAndReturn
   */
  export type ConcessionPriceItemCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * The data used to create many ConcessionPriceItems.
     */
    data: ConcessionPriceItemCreateManyInput | ConcessionPriceItemCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ConcessionPriceItem update
   */
  export type ConcessionPriceItemUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * The data needed to update a ConcessionPriceItem.
     */
    data: XOR<ConcessionPriceItemUpdateInput, ConcessionPriceItemUncheckedUpdateInput>;
    /**
     * Choose, which ConcessionPriceItem to update.
     */
    where: ConcessionPriceItemWhereUniqueInput;
  };

  /**
   * ConcessionPriceItem updateMany
   */
  export type ConcessionPriceItemUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update ConcessionPriceItems.
     */
    data: XOR<
      ConcessionPriceItemUpdateManyMutationInput,
      ConcessionPriceItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which ConcessionPriceItems to update
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * Limit how many ConcessionPriceItems to update.
     */
    limit?: number;
  };

  /**
   * ConcessionPriceItem updateManyAndReturn
   */
  export type ConcessionPriceItemUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * The data used to update ConcessionPriceItems.
     */
    data: XOR<
      ConcessionPriceItemUpdateManyMutationInput,
      ConcessionPriceItemUncheckedUpdateManyInput
    >;
    /**
     * Filter which ConcessionPriceItems to update
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * Limit how many ConcessionPriceItems to update.
     */
    limit?: number;
  };

  /**
   * ConcessionPriceItem upsert
   */
  export type ConcessionPriceItemUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * The filter to search for the ConcessionPriceItem to update in case it exists.
     */
    where: ConcessionPriceItemWhereUniqueInput;
    /**
     * In case the ConcessionPriceItem found by the `where` argument doesn't exist, create a new ConcessionPriceItem with this data.
     */
    create: XOR<ConcessionPriceItemCreateInput, ConcessionPriceItemUncheckedCreateInput>;
    /**
     * In case the ConcessionPriceItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConcessionPriceItemUpdateInput, ConcessionPriceItemUncheckedUpdateInput>;
  };

  /**
   * ConcessionPriceItem delete
   */
  export type ConcessionPriceItemDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
    /**
     * Filter which ConcessionPriceItem to delete.
     */
    where: ConcessionPriceItemWhereUniqueInput;
  };

  /**
   * ConcessionPriceItem deleteMany
   */
  export type ConcessionPriceItemDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which ConcessionPriceItems to delete
     */
    where?: ConcessionPriceItemWhereInput;
    /**
     * Limit how many ConcessionPriceItems to delete.
     */
    limit?: number;
  };

  /**
   * ConcessionPriceItem without action
   */
  export type ConcessionPriceItemDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ConcessionPriceItem
     */
    select?: ConcessionPriceItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConcessionPriceItem
     */
    omit?: ConcessionPriceItemOmit<ExtArgs> | null;
  };

  /**
   * Model DisplayPage
   */

  export type AggregateDisplayPage = {
    _count: DisplayPageCountAggregateOutputType | null;
    _min: DisplayPageMinAggregateOutputType | null;
    _max: DisplayPageMaxAggregateOutputType | null;
  };

  export type DisplayPageMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DisplayPageMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    slug: string | null;
    description: string | null;
    status: $Enums.RecordStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type DisplayPageCountAggregateOutputType = {
    id: number;
    name: number;
    slug: number;
    description: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type DisplayPageMinAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DisplayPageMaxAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type DisplayPageCountAggregateInputType = {
    id?: true;
    name?: true;
    slug?: true;
    description?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type DisplayPageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which DisplayPage to aggregate.
     */
    where?: DisplayPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DisplayPages to fetch.
     */
    orderBy?: DisplayPageOrderByWithRelationInput | DisplayPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: DisplayPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DisplayPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DisplayPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DisplayPages
     **/
    _count?: true | DisplayPageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DisplayPageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DisplayPageMaxAggregateInputType;
  };

  export type GetDisplayPageAggregateType<T extends DisplayPageAggregateArgs> = {
    [P in keyof T & keyof AggregateDisplayPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisplayPage[P]>
      : GetScalarType<T[P], AggregateDisplayPage[P]>;
  };

  export type DisplayPageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: DisplayPageWhereInput;
    orderBy?: DisplayPageOrderByWithAggregationInput | DisplayPageOrderByWithAggregationInput[];
    by: DisplayPageScalarFieldEnum[] | DisplayPageScalarFieldEnum;
    having?: DisplayPageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DisplayPageCountAggregateInputType | true;
    _min?: DisplayPageMinAggregateInputType;
    _max?: DisplayPageMaxAggregateInputType;
  };

  export type DisplayPageGroupByOutputType = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    status: $Enums.RecordStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: DisplayPageCountAggregateOutputType | null;
    _min: DisplayPageMinAggregateOutputType | null;
    _max: DisplayPageMaxAggregateOutputType | null;
  };

  type GetDisplayPageGroupByPayload<T extends DisplayPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisplayPageGroupByOutputType, T['by']> & {
        [P in keyof T & keyof DisplayPageGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], DisplayPageGroupByOutputType[P]>
          : GetScalarType<T[P], DisplayPageGroupByOutputType[P]>;
      }
    >
  >;

  export type DisplayPageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['displayPage']
  >;

  export type DisplayPageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['displayPage']
  >;

  export type DisplayPageSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      slug?: boolean;
      description?: boolean;
      status?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['displayPage']
  >;

  export type DisplayPageSelectScalar = {
    id?: boolean;
    name?: boolean;
    slug?: boolean;
    description?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type DisplayPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetOmit<
      'id' | 'name' | 'slug' | 'description' | 'status' | 'createdAt' | 'updatedAt',
      ExtArgs['result']['displayPage']
    >;

  export type $DisplayPagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'DisplayPage';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        status: $Enums.RecordStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['displayPage']
    >;
    composites: {};
  };

  type DisplayPageGetPayload<S extends boolean | null | undefined | DisplayPageDefaultArgs> =
    $Result.GetResult<Prisma.$DisplayPagePayload, S>;

  type DisplayPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DisplayPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DisplayPageCountAggregateInputType | true;
    };

  export interface DisplayPageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['DisplayPage'];
      meta: { name: 'DisplayPage' };
    };
    /**
     * Find zero or one DisplayPage that matches the filter.
     * @param {DisplayPageFindUniqueArgs} args - Arguments to find a DisplayPage
     * @example
     * // Get one DisplayPage
     * const displayPage = await prisma.displayPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisplayPageFindUniqueArgs>(
      args: SelectSubset<T, DisplayPageFindUniqueArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<
        Prisma.$DisplayPagePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one DisplayPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DisplayPageFindUniqueOrThrowArgs} args - Arguments to find a DisplayPage
     * @example
     * // Get one DisplayPage
     * const displayPage = await prisma.displayPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisplayPageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, DisplayPageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<
        Prisma.$DisplayPagePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first DisplayPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageFindFirstArgs} args - Arguments to find a DisplayPage
     * @example
     * // Get one DisplayPage
     * const displayPage = await prisma.displayPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisplayPageFindFirstArgs>(
      args?: SelectSubset<T, DisplayPageFindFirstArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<
        Prisma.$DisplayPagePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first DisplayPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageFindFirstOrThrowArgs} args - Arguments to find a DisplayPage
     * @example
     * // Get one DisplayPage
     * const displayPage = await prisma.displayPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisplayPageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DisplayPageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<
        Prisma.$DisplayPagePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more DisplayPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DisplayPages
     * const displayPages = await prisma.displayPage.findMany()
     *
     * // Get first 10 DisplayPages
     * const displayPages = await prisma.displayPage.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const displayPageWithIdOnly = await prisma.displayPage.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DisplayPageFindManyArgs>(
      args?: SelectSubset<T, DisplayPageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$DisplayPagePayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a DisplayPage.
     * @param {DisplayPageCreateArgs} args - Arguments to create a DisplayPage.
     * @example
     * // Create one DisplayPage
     * const DisplayPage = await prisma.displayPage.create({
     *   data: {
     *     // ... data to create a DisplayPage
     *   }
     * })
     *
     */
    create<T extends DisplayPageCreateArgs>(
      args: SelectSubset<T, DisplayPageCreateArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<Prisma.$DisplayPagePayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many DisplayPages.
     * @param {DisplayPageCreateManyArgs} args - Arguments to create many DisplayPages.
     * @example
     * // Create many DisplayPages
     * const displayPage = await prisma.displayPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DisplayPageCreateManyArgs>(
      args?: SelectSubset<T, DisplayPageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many DisplayPages and returns the data saved in the database.
     * @param {DisplayPageCreateManyAndReturnArgs} args - Arguments to create many DisplayPages.
     * @example
     * // Create many DisplayPages
     * const displayPage = await prisma.displayPage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DisplayPages and only return the `id`
     * const displayPageWithIdOnly = await prisma.displayPage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DisplayPageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, DisplayPageCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DisplayPagePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a DisplayPage.
     * @param {DisplayPageDeleteArgs} args - Arguments to delete one DisplayPage.
     * @example
     * // Delete one DisplayPage
     * const DisplayPage = await prisma.displayPage.delete({
     *   where: {
     *     // ... filter to delete one DisplayPage
     *   }
     * })
     *
     */
    delete<T extends DisplayPageDeleteArgs>(
      args: SelectSubset<T, DisplayPageDeleteArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<Prisma.$DisplayPagePayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one DisplayPage.
     * @param {DisplayPageUpdateArgs} args - Arguments to update one DisplayPage.
     * @example
     * // Update one DisplayPage
     * const displayPage = await prisma.displayPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DisplayPageUpdateArgs>(
      args: SelectSubset<T, DisplayPageUpdateArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<Prisma.$DisplayPagePayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more DisplayPages.
     * @param {DisplayPageDeleteManyArgs} args - Arguments to filter DisplayPages to delete.
     * @example
     * // Delete a few DisplayPages
     * const { count } = await prisma.displayPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DisplayPageDeleteManyArgs>(
      args?: SelectSubset<T, DisplayPageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more DisplayPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DisplayPages
     * const displayPage = await prisma.displayPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DisplayPageUpdateManyArgs>(
      args: SelectSubset<T, DisplayPageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more DisplayPages and returns the data updated in the database.
     * @param {DisplayPageUpdateManyAndReturnArgs} args - Arguments to update many DisplayPages.
     * @example
     * // Update many DisplayPages
     * const displayPage = await prisma.displayPage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DisplayPages and only return the `id`
     * const displayPageWithIdOnly = await prisma.displayPage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DisplayPageUpdateManyAndReturnArgs>(
      args: SelectSubset<T, DisplayPageUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DisplayPagePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one DisplayPage.
     * @param {DisplayPageUpsertArgs} args - Arguments to update or create a DisplayPage.
     * @example
     * // Update or create a DisplayPage
     * const displayPage = await prisma.displayPage.upsert({
     *   create: {
     *     // ... data to create a DisplayPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DisplayPage we want to update
     *   }
     * })
     */
    upsert<T extends DisplayPageUpsertArgs>(
      args: SelectSubset<T, DisplayPageUpsertArgs<ExtArgs>>
    ): Prisma__DisplayPageClient<
      $Result.GetResult<Prisma.$DisplayPagePayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of DisplayPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageCountArgs} args - Arguments to filter DisplayPages to count.
     * @example
     * // Count the number of DisplayPages
     * const count = await prisma.displayPage.count({
     *   where: {
     *     // ... the filter for the DisplayPages we want to count
     *   }
     * })
     **/
    count<T extends DisplayPageCountArgs>(
      args?: Subset<T, DisplayPageCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisplayPageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a DisplayPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends DisplayPageAggregateArgs>(
      args: Subset<T, DisplayPageAggregateArgs>
    ): Prisma.PrismaPromise<GetDisplayPageAggregateType<T>>;

    /**
     * Group by DisplayPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisplayPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends DisplayPageGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisplayPageGroupByArgs['orderBy'] }
        : { orderBy?: DisplayPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, DisplayPageGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors ? GetDisplayPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DisplayPage model
     */
    readonly fields: DisplayPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DisplayPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisplayPageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the DisplayPage model
   */
  interface DisplayPageFieldRefs {
    readonly id: FieldRef<'DisplayPage', 'String'>;
    readonly name: FieldRef<'DisplayPage', 'String'>;
    readonly slug: FieldRef<'DisplayPage', 'String'>;
    readonly description: FieldRef<'DisplayPage', 'String'>;
    readonly status: FieldRef<'DisplayPage', 'RecordStatus'>;
    readonly createdAt: FieldRef<'DisplayPage', 'DateTime'>;
    readonly updatedAt: FieldRef<'DisplayPage', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * DisplayPage findUnique
   */
  export type DisplayPageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * Filter, which DisplayPage to fetch.
     */
    where: DisplayPageWhereUniqueInput;
  };

  /**
   * DisplayPage findUniqueOrThrow
   */
  export type DisplayPageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * Filter, which DisplayPage to fetch.
     */
    where: DisplayPageWhereUniqueInput;
  };

  /**
   * DisplayPage findFirst
   */
  export type DisplayPageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * Filter, which DisplayPage to fetch.
     */
    where?: DisplayPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DisplayPages to fetch.
     */
    orderBy?: DisplayPageOrderByWithRelationInput | DisplayPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DisplayPages.
     */
    cursor?: DisplayPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DisplayPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DisplayPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DisplayPages.
     */
    distinct?: DisplayPageScalarFieldEnum | DisplayPageScalarFieldEnum[];
  };

  /**
   * DisplayPage findFirstOrThrow
   */
  export type DisplayPageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * Filter, which DisplayPage to fetch.
     */
    where?: DisplayPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DisplayPages to fetch.
     */
    orderBy?: DisplayPageOrderByWithRelationInput | DisplayPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DisplayPages.
     */
    cursor?: DisplayPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DisplayPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DisplayPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DisplayPages.
     */
    distinct?: DisplayPageScalarFieldEnum | DisplayPageScalarFieldEnum[];
  };

  /**
   * DisplayPage findMany
   */
  export type DisplayPageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * Filter, which DisplayPages to fetch.
     */
    where?: DisplayPageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DisplayPages to fetch.
     */
    orderBy?: DisplayPageOrderByWithRelationInput | DisplayPageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DisplayPages.
     */
    cursor?: DisplayPageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DisplayPages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DisplayPages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DisplayPages.
     */
    distinct?: DisplayPageScalarFieldEnum | DisplayPageScalarFieldEnum[];
  };

  /**
   * DisplayPage create
   */
  export type DisplayPageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * The data needed to create a DisplayPage.
     */
    data: XOR<DisplayPageCreateInput, DisplayPageUncheckedCreateInput>;
  };

  /**
   * DisplayPage createMany
   */
  export type DisplayPageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many DisplayPages.
     */
    data: DisplayPageCreateManyInput | DisplayPageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * DisplayPage createManyAndReturn
   */
  export type DisplayPageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * The data used to create many DisplayPages.
     */
    data: DisplayPageCreateManyInput | DisplayPageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * DisplayPage update
   */
  export type DisplayPageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * The data needed to update a DisplayPage.
     */
    data: XOR<DisplayPageUpdateInput, DisplayPageUncheckedUpdateInput>;
    /**
     * Choose, which DisplayPage to update.
     */
    where: DisplayPageWhereUniqueInput;
  };

  /**
   * DisplayPage updateMany
   */
  export type DisplayPageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update DisplayPages.
     */
    data: XOR<DisplayPageUpdateManyMutationInput, DisplayPageUncheckedUpdateManyInput>;
    /**
     * Filter which DisplayPages to update
     */
    where?: DisplayPageWhereInput;
    /**
     * Limit how many DisplayPages to update.
     */
    limit?: number;
  };

  /**
   * DisplayPage updateManyAndReturn
   */
  export type DisplayPageUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * The data used to update DisplayPages.
     */
    data: XOR<DisplayPageUpdateManyMutationInput, DisplayPageUncheckedUpdateManyInput>;
    /**
     * Filter which DisplayPages to update
     */
    where?: DisplayPageWhereInput;
    /**
     * Limit how many DisplayPages to update.
     */
    limit?: number;
  };

  /**
   * DisplayPage upsert
   */
  export type DisplayPageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * The filter to search for the DisplayPage to update in case it exists.
     */
    where: DisplayPageWhereUniqueInput;
    /**
     * In case the DisplayPage found by the `where` argument doesn't exist, create a new DisplayPage with this data.
     */
    create: XOR<DisplayPageCreateInput, DisplayPageUncheckedCreateInput>;
    /**
     * In case the DisplayPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisplayPageUpdateInput, DisplayPageUncheckedUpdateInput>;
  };

  /**
   * DisplayPage delete
   */
  export type DisplayPageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
    /**
     * Filter which DisplayPage to delete.
     */
    where: DisplayPageWhereUniqueInput;
  };

  /**
   * DisplayPage deleteMany
   */
  export type DisplayPageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which DisplayPages to delete
     */
    where?: DisplayPageWhereInput;
    /**
     * Limit how many DisplayPages to delete.
     */
    limit?: number;
  };

  /**
   * DisplayPage without action
   */
  export type DisplayPageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the DisplayPage
     */
    select?: DisplayPageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DisplayPage
     */
    omit?: DisplayPageOmit<ExtArgs> | null;
  };

  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null;
    _min: SystemSettingMinAggregateOutputType | null;
    _max: SystemSettingMaxAggregateOutputType | null;
  };

  export type SystemSettingMinAggregateOutputType = {
    id: string | null;
    key: string | null;
    value: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SystemSettingMaxAggregateOutputType = {
    id: string | null;
    key: string | null;
    value: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type SystemSettingCountAggregateOutputType = {
    id: number;
    key: number;
    value: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type SystemSettingMinAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SystemSettingMaxAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type SystemSettingCountAggregateInputType = {
    id?: true;
    key?: true;
    value?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type SystemSettingAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SystemSettings
     **/
    _count?: true | SystemSettingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SystemSettingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SystemSettingMaxAggregateInputType;
  };

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
    [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>;
  };

  export type SystemSettingGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: SystemSettingWhereInput;
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[];
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum;
    having?: SystemSettingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SystemSettingCountAggregateInputType | true;
    _min?: SystemSettingMinAggregateInputType;
    _max?: SystemSettingMaxAggregateInputType;
  };

  export type SystemSettingGroupByOutputType = {
    id: string;
    key: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SystemSettingCountAggregateOutputType | null;
    _min: SystemSettingMinAggregateOutputType | null;
    _max: SystemSettingMaxAggregateOutputType | null;
  };

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SystemSettingGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
          : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>;
      }
    >
  >;

  export type SystemSettingSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      key?: boolean;
      value?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['systemSetting']
  >;

  export type SystemSettingSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      key?: boolean;
      value?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['systemSetting']
  >;

  export type SystemSettingSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      key?: boolean;
      value?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['systemSetting']
  >;

  export type SystemSettingSelectScalar = {
    id?: boolean;
    key?: boolean;
    value?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type SystemSettingOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    'id' | 'key' | 'value' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['systemSetting']
  >;

  export type $SystemSettingPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: 'SystemSetting';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        key: string;
        value: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['systemSetting']
    >;
    composites: {};
  };

  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> =
    $Result.GetResult<Prisma.$SystemSettingPayload, S>;

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemSettingCountAggregateInputType | true;
    };

  export interface SystemSettingDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'];
      meta: { name: 'SystemSetting' };
    };
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingFindUniqueArgs>(
      args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<
        Prisma.$SystemSettingPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one SystemSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<
        Prisma.$SystemSettingPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingFindFirstArgs>(
      args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<
        Prisma.$SystemSettingPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<
        Prisma.$SystemSettingPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     *
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SystemSettingFindManyArgs>(
      args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findMany', GlobalOmitOptions>
    >;

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     *
     */
    create<T extends SystemSettingCreateArgs>(
      args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'create', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many SystemSettings.
     * @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SystemSettingCreateManyArgs>(
      args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SystemSettingCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SystemSettingCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SystemSettingPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     *
     */
    delete<T extends SystemSettingDeleteArgs>(
      args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'delete', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SystemSettingUpdateArgs>(
      args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'update', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SystemSettingDeleteManyArgs>(
      args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SystemSettingUpdateManyArgs>(
      args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more SystemSettings and returns the data updated in the database.
     * @param {SystemSettingUpdateManyAndReturnArgs} args - Arguments to update many SystemSettings.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SystemSettingUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SystemSettingUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SystemSettingPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingUpsertArgs>(
      args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<
      $Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'upsert', GlobalOmitOptions>,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
     **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SystemSettingAggregateArgs>(
      args: Subset<T, SystemSettingAggregateArgs>
    ): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>;

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
    >(
      args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetSystemSettingGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SystemSetting model
     */
    readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the SystemSetting model
   */
  interface SystemSettingFieldRefs {
    readonly id: FieldRef<'SystemSetting', 'String'>;
    readonly key: FieldRef<'SystemSetting', 'String'>;
    readonly value: FieldRef<'SystemSetting', 'String'>;
    readonly createdAt: FieldRef<'SystemSetting', 'DateTime'>;
    readonly updatedAt: FieldRef<'SystemSetting', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput;
  };

  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput;
  };

  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[];
  };

  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[];
  };

  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SystemSettings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[];
  };

  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>;
  };

  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * SystemSetting createManyAndReturn
   */
  export type SystemSettingCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>;
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput;
  };

  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>;
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput;
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number;
  };

  /**
   * SystemSetting updateManyAndReturn
   */
  export type SystemSettingUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>;
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput;
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number;
  };

  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput;
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>;
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>;
  };

  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput;
  };

  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput;
    /**
     * Limit how many SystemSettings to delete.
     */
    limit?: number;
  };

  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    name: 'name';
    email: 'email';
    password: 'password';
    role: 'role';
    permissions: 'permissions';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const StaffMemberScalarFieldEnum: {
    id: 'id';
    name: 'name';
    designation: 'designation';
    department: 'department';
    phone: 'phone';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type StaffMemberScalarFieldEnum =
    (typeof StaffMemberScalarFieldEnum)[keyof typeof StaffMemberScalarFieldEnum];

  export const ManagerScalarFieldEnum: {
    id: 'id';
    name: 'name';
    designation: 'designation';
    phone: 'phone';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ManagerScalarFieldEnum =
    (typeof ManagerScalarFieldEnum)[keyof typeof ManagerScalarFieldEnum];

  export const AttendanceRecordScalarFieldEnum: {
    id: 'id';
    staffId: 'staffId';
    date: 'date';
    shift: 'shift';
    status: 'status';
    remarks: 'remarks';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type AttendanceRecordScalarFieldEnum =
    (typeof AttendanceRecordScalarFieldEnum)[keyof typeof AttendanceRecordScalarFieldEnum];

  export const ManagerAttendanceRecordScalarFieldEnum: {
    id: 'id';
    managerId: 'managerId';
    date: 'date';
    shift: 'shift';
    status: 'status';
    remarks: 'remarks';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ManagerAttendanceRecordScalarFieldEnum =
    (typeof ManagerAttendanceRecordScalarFieldEnum)[keyof typeof ManagerAttendanceRecordScalarFieldEnum];

  export const EventRecordScalarFieldEnum: {
    id: 'id';
    title: 'title';
    clientName: 'clientName';
    companyName: 'companyName';
    screenName: 'screenName';
    startAt: 'startAt';
    endAt: 'endAt';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type EventRecordScalarFieldEnum =
    (typeof EventRecordScalarFieldEnum)[keyof typeof EventRecordScalarFieldEnum];

  export const MeetingScheduleScalarFieldEnum: {
    id: 'id';
    title: 'title';
    location: 'location';
    organizer: 'organizer';
    startAt: 'startAt';
    endAt: 'endAt';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type MeetingScheduleScalarFieldEnum =
    (typeof MeetingScheduleScalarFieldEnum)[keyof typeof MeetingScheduleScalarFieldEnum];

  export const AdvertisementScalarFieldEnum: {
    id: 'id';
    title: 'title';
    mediaUrl: 'mediaUrl';
    mediaType: 'mediaType';
    duration: 'duration';
    sortOrder: 'sortOrder';
    status: 'status';
    startAt: 'startAt';
    endAt: 'endAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type AdvertisementScalarFieldEnum =
    (typeof AdvertisementScalarFieldEnum)[keyof typeof AdvertisementScalarFieldEnum];

  export const WeatherSettingScalarFieldEnum: {
    id: 'id';
    city: 'city';
    provider: 'provider';
    apiKey: 'apiKey';
    enabled: 'enabled';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type WeatherSettingScalarFieldEnum =
    (typeof WeatherSettingScalarFieldEnum)[keyof typeof WeatherSettingScalarFieldEnum];

  export const MovieScheduleScalarFieldEnum: {
    id: 'id';
    movieName: 'movieName';
    screenName: 'screenName';
    showTime: 'showTime';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type MovieScheduleScalarFieldEnum =
    (typeof MovieScheduleScalarFieldEnum)[keyof typeof MovieScheduleScalarFieldEnum];

  export const ItemSalesTargetScalarFieldEnum: {
    id: 'id';
    itemName: 'itemName';
    itemCode: 'itemCode';
    dailyTarget: 'dailyTarget';
    weeklyTarget: 'weeklyTarget';
    monthlyTarget: 'monthlyTarget';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ItemSalesTargetScalarFieldEnum =
    (typeof ItemSalesTargetScalarFieldEnum)[keyof typeof ItemSalesTargetScalarFieldEnum];

  export const ConcessionPriceItemScalarFieldEnum: {
    id: 'id';
    itemName: 'itemName';
    category: 'category';
    price: 'price';
    sortOrder: 'sortOrder';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ConcessionPriceItemScalarFieldEnum =
    (typeof ConcessionPriceItemScalarFieldEnum)[keyof typeof ConcessionPriceItemScalarFieldEnum];

  export const DisplayPageScalarFieldEnum: {
    id: 'id';
    name: 'name';
    slug: 'slug';
    description: 'description';
    status: 'status';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type DisplayPageScalarFieldEnum =
    (typeof DisplayPageScalarFieldEnum)[keyof typeof DisplayPageScalarFieldEnum];

  export const SystemSettingScalarFieldEnum: {
    id: 'id';
    key: 'key';
    value: 'value';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type SystemSettingScalarFieldEnum =
    (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'RecordStatus'
   */
  export type EnumRecordStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RecordStatus'
  >;

  /**
   * Reference to a field of type 'RecordStatus[]'
   */
  export type ListEnumRecordStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RecordStatus[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'AttendanceStatus'
   */
  export type EnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AttendanceStatus'
  >;

  /**
   * Reference to a field of type 'AttendanceStatus[]'
   */
  export type ListEnumAttendanceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AttendanceStatus[]'
  >;

  /**
   * Reference to a field of type 'AdMediaType'
   */
  export type EnumAdMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AdMediaType'
  >;

  /**
   * Reference to a field of type 'AdMediaType[]'
   */
  export type ListEnumAdMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'AdMediaType[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    name?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    password?: StringFilter<'User'> | string;
    role?: StringFilter<'User'> | string;
    permissions?: StringNullableListFilter<'User'>;
    status?: EnumRecordStatusFilter<'User'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    permissions?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringFilter<'User'> | string;
      password?: StringFilter<'User'> | string;
      role?: StringFilter<'User'> | string;
      permissions?: StringNullableListFilter<'User'>;
      status?: EnumRecordStatusFilter<'User'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    permissions?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    name?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
    password?: StringWithAggregatesFilter<'User'> | string;
    role?: StringWithAggregatesFilter<'User'> | string;
    permissions?: StringNullableListFilter<'User'>;
    status?: EnumRecordStatusWithAggregatesFilter<'User'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type StaffMemberWhereInput = {
    AND?: StaffMemberWhereInput | StaffMemberWhereInput[];
    OR?: StaffMemberWhereInput[];
    NOT?: StaffMemberWhereInput | StaffMemberWhereInput[];
    id?: StringFilter<'StaffMember'> | string;
    name?: StringFilter<'StaffMember'> | string;
    designation?: StringFilter<'StaffMember'> | string;
    department?: StringNullableFilter<'StaffMember'> | string | null;
    phone?: StringNullableFilter<'StaffMember'> | string | null;
    status?: EnumRecordStatusFilter<'StaffMember'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'StaffMember'> | Date | string;
    updatedAt?: DateTimeFilter<'StaffMember'> | Date | string;
    attendanceRecords?: AttendanceRecordListRelationFilter;
  };

  export type StaffMemberOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    department?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    attendanceRecords?: AttendanceRecordOrderByRelationAggregateInput;
  };

  export type StaffMemberWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: StaffMemberWhereInput | StaffMemberWhereInput[];
      OR?: StaffMemberWhereInput[];
      NOT?: StaffMemberWhereInput | StaffMemberWhereInput[];
      name?: StringFilter<'StaffMember'> | string;
      designation?: StringFilter<'StaffMember'> | string;
      department?: StringNullableFilter<'StaffMember'> | string | null;
      phone?: StringNullableFilter<'StaffMember'> | string | null;
      status?: EnumRecordStatusFilter<'StaffMember'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'StaffMember'> | Date | string;
      updatedAt?: DateTimeFilter<'StaffMember'> | Date | string;
      attendanceRecords?: AttendanceRecordListRelationFilter;
    },
    'id'
  >;

  export type StaffMemberOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    department?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: StaffMemberCountOrderByAggregateInput;
    _max?: StaffMemberMaxOrderByAggregateInput;
    _min?: StaffMemberMinOrderByAggregateInput;
  };

  export type StaffMemberScalarWhereWithAggregatesInput = {
    AND?: StaffMemberScalarWhereWithAggregatesInput | StaffMemberScalarWhereWithAggregatesInput[];
    OR?: StaffMemberScalarWhereWithAggregatesInput[];
    NOT?: StaffMemberScalarWhereWithAggregatesInput | StaffMemberScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'StaffMember'> | string;
    name?: StringWithAggregatesFilter<'StaffMember'> | string;
    designation?: StringWithAggregatesFilter<'StaffMember'> | string;
    department?: StringNullableWithAggregatesFilter<'StaffMember'> | string | null;
    phone?: StringNullableWithAggregatesFilter<'StaffMember'> | string | null;
    status?: EnumRecordStatusWithAggregatesFilter<'StaffMember'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'StaffMember'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'StaffMember'> | Date | string;
  };

  export type ManagerWhereInput = {
    AND?: ManagerWhereInput | ManagerWhereInput[];
    OR?: ManagerWhereInput[];
    NOT?: ManagerWhereInput | ManagerWhereInput[];
    id?: StringFilter<'Manager'> | string;
    name?: StringFilter<'Manager'> | string;
    designation?: StringNullableFilter<'Manager'> | string | null;
    phone?: StringNullableFilter<'Manager'> | string | null;
    status?: EnumRecordStatusFilter<'Manager'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'Manager'> | Date | string;
    updatedAt?: DateTimeFilter<'Manager'> | Date | string;
    attendanceRecords?: ManagerAttendanceRecordListRelationFilter;
  };

  export type ManagerOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    attendanceRecords?: ManagerAttendanceRecordOrderByRelationAggregateInput;
  };

  export type ManagerWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ManagerWhereInput | ManagerWhereInput[];
      OR?: ManagerWhereInput[];
      NOT?: ManagerWhereInput | ManagerWhereInput[];
      name?: StringFilter<'Manager'> | string;
      designation?: StringNullableFilter<'Manager'> | string | null;
      phone?: StringNullableFilter<'Manager'> | string | null;
      status?: EnumRecordStatusFilter<'Manager'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'Manager'> | Date | string;
      updatedAt?: DateTimeFilter<'Manager'> | Date | string;
      attendanceRecords?: ManagerAttendanceRecordListRelationFilter;
    },
    'id'
  >;

  export type ManagerOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ManagerCountOrderByAggregateInput;
    _max?: ManagerMaxOrderByAggregateInput;
    _min?: ManagerMinOrderByAggregateInput;
  };

  export type ManagerScalarWhereWithAggregatesInput = {
    AND?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[];
    OR?: ManagerScalarWhereWithAggregatesInput[];
    NOT?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Manager'> | string;
    name?: StringWithAggregatesFilter<'Manager'> | string;
    designation?: StringNullableWithAggregatesFilter<'Manager'> | string | null;
    phone?: StringNullableWithAggregatesFilter<'Manager'> | string | null;
    status?: EnumRecordStatusWithAggregatesFilter<'Manager'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'Manager'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Manager'> | Date | string;
  };

  export type AttendanceRecordWhereInput = {
    AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[];
    OR?: AttendanceRecordWhereInput[];
    NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[];
    id?: StringFilter<'AttendanceRecord'> | string;
    staffId?: StringFilter<'AttendanceRecord'> | string;
    date?: DateTimeFilter<'AttendanceRecord'> | Date | string;
    shift?: StringNullableFilter<'AttendanceRecord'> | string | null;
    status?: EnumAttendanceStatusFilter<'AttendanceRecord'> | $Enums.AttendanceStatus;
    remarks?: StringNullableFilter<'AttendanceRecord'> | string | null;
    createdAt?: DateTimeFilter<'AttendanceRecord'> | Date | string;
    updatedAt?: DateTimeFilter<'AttendanceRecord'> | Date | string;
    staff?: XOR<StaffMemberScalarRelationFilter, StaffMemberWhereInput>;
  };

  export type AttendanceRecordOrderByWithRelationInput = {
    id?: SortOrder;
    staffId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrderInput | SortOrder;
    status?: SortOrder;
    remarks?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    staff?: StaffMemberOrderByWithRelationInput;
  };

  export type AttendanceRecordWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[];
      OR?: AttendanceRecordWhereInput[];
      NOT?: AttendanceRecordWhereInput | AttendanceRecordWhereInput[];
      staffId?: StringFilter<'AttendanceRecord'> | string;
      date?: DateTimeFilter<'AttendanceRecord'> | Date | string;
      shift?: StringNullableFilter<'AttendanceRecord'> | string | null;
      status?: EnumAttendanceStatusFilter<'AttendanceRecord'> | $Enums.AttendanceStatus;
      remarks?: StringNullableFilter<'AttendanceRecord'> | string | null;
      createdAt?: DateTimeFilter<'AttendanceRecord'> | Date | string;
      updatedAt?: DateTimeFilter<'AttendanceRecord'> | Date | string;
      staff?: XOR<StaffMemberScalarRelationFilter, StaffMemberWhereInput>;
    },
    'id'
  >;

  export type AttendanceRecordOrderByWithAggregationInput = {
    id?: SortOrder;
    staffId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrderInput | SortOrder;
    status?: SortOrder;
    remarks?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AttendanceRecordCountOrderByAggregateInput;
    _max?: AttendanceRecordMaxOrderByAggregateInput;
    _min?: AttendanceRecordMinOrderByAggregateInput;
  };

  export type AttendanceRecordScalarWhereWithAggregatesInput = {
    AND?:
      | AttendanceRecordScalarWhereWithAggregatesInput
      | AttendanceRecordScalarWhereWithAggregatesInput[];
    OR?: AttendanceRecordScalarWhereWithAggregatesInput[];
    NOT?:
      | AttendanceRecordScalarWhereWithAggregatesInput
      | AttendanceRecordScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'AttendanceRecord'> | string;
    staffId?: StringWithAggregatesFilter<'AttendanceRecord'> | string;
    date?: DateTimeWithAggregatesFilter<'AttendanceRecord'> | Date | string;
    shift?: StringNullableWithAggregatesFilter<'AttendanceRecord'> | string | null;
    status?: EnumAttendanceStatusWithAggregatesFilter<'AttendanceRecord'> | $Enums.AttendanceStatus;
    remarks?: StringNullableWithAggregatesFilter<'AttendanceRecord'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'AttendanceRecord'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'AttendanceRecord'> | Date | string;
  };

  export type ManagerAttendanceRecordWhereInput = {
    AND?: ManagerAttendanceRecordWhereInput | ManagerAttendanceRecordWhereInput[];
    OR?: ManagerAttendanceRecordWhereInput[];
    NOT?: ManagerAttendanceRecordWhereInput | ManagerAttendanceRecordWhereInput[];
    id?: StringFilter<'ManagerAttendanceRecord'> | string;
    managerId?: StringFilter<'ManagerAttendanceRecord'> | string;
    date?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
    shift?: StringNullableFilter<'ManagerAttendanceRecord'> | string | null;
    status?: EnumAttendanceStatusFilter<'ManagerAttendanceRecord'> | $Enums.AttendanceStatus;
    remarks?: StringNullableFilter<'ManagerAttendanceRecord'> | string | null;
    createdAt?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
    updatedAt?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
    manager?: XOR<ManagerScalarRelationFilter, ManagerWhereInput>;
  };

  export type ManagerAttendanceRecordOrderByWithRelationInput = {
    id?: SortOrder;
    managerId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrderInput | SortOrder;
    status?: SortOrder;
    remarks?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    manager?: ManagerOrderByWithRelationInput;
  };

  export type ManagerAttendanceRecordWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ManagerAttendanceRecordWhereInput | ManagerAttendanceRecordWhereInput[];
      OR?: ManagerAttendanceRecordWhereInput[];
      NOT?: ManagerAttendanceRecordWhereInput | ManagerAttendanceRecordWhereInput[];
      managerId?: StringFilter<'ManagerAttendanceRecord'> | string;
      date?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
      shift?: StringNullableFilter<'ManagerAttendanceRecord'> | string | null;
      status?: EnumAttendanceStatusFilter<'ManagerAttendanceRecord'> | $Enums.AttendanceStatus;
      remarks?: StringNullableFilter<'ManagerAttendanceRecord'> | string | null;
      createdAt?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
      updatedAt?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
      manager?: XOR<ManagerScalarRelationFilter, ManagerWhereInput>;
    },
    'id'
  >;

  export type ManagerAttendanceRecordOrderByWithAggregationInput = {
    id?: SortOrder;
    managerId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrderInput | SortOrder;
    status?: SortOrder;
    remarks?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ManagerAttendanceRecordCountOrderByAggregateInput;
    _max?: ManagerAttendanceRecordMaxOrderByAggregateInput;
    _min?: ManagerAttendanceRecordMinOrderByAggregateInput;
  };

  export type ManagerAttendanceRecordScalarWhereWithAggregatesInput = {
    AND?:
      | ManagerAttendanceRecordScalarWhereWithAggregatesInput
      | ManagerAttendanceRecordScalarWhereWithAggregatesInput[];
    OR?: ManagerAttendanceRecordScalarWhereWithAggregatesInput[];
    NOT?:
      | ManagerAttendanceRecordScalarWhereWithAggregatesInput
      | ManagerAttendanceRecordScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'ManagerAttendanceRecord'> | string;
    managerId?: StringWithAggregatesFilter<'ManagerAttendanceRecord'> | string;
    date?: DateTimeWithAggregatesFilter<'ManagerAttendanceRecord'> | Date | string;
    shift?: StringNullableWithAggregatesFilter<'ManagerAttendanceRecord'> | string | null;
    status?:
      | EnumAttendanceStatusWithAggregatesFilter<'ManagerAttendanceRecord'>
      | $Enums.AttendanceStatus;
    remarks?: StringNullableWithAggregatesFilter<'ManagerAttendanceRecord'> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'ManagerAttendanceRecord'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'ManagerAttendanceRecord'> | Date | string;
  };

  export type EventRecordWhereInput = {
    AND?: EventRecordWhereInput | EventRecordWhereInput[];
    OR?: EventRecordWhereInput[];
    NOT?: EventRecordWhereInput | EventRecordWhereInput[];
    id?: StringFilter<'EventRecord'> | string;
    title?: StringFilter<'EventRecord'> | string;
    clientName?: StringNullableFilter<'EventRecord'> | string | null;
    companyName?: StringNullableFilter<'EventRecord'> | string | null;
    screenName?: StringNullableFilter<'EventRecord'> | string | null;
    startAt?: DateTimeFilter<'EventRecord'> | Date | string;
    endAt?: DateTimeNullableFilter<'EventRecord'> | Date | string | null;
    status?: EnumRecordStatusFilter<'EventRecord'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'EventRecord'> | Date | string;
    updatedAt?: DateTimeFilter<'EventRecord'> | Date | string;
  };

  export type EventRecordOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    clientName?: SortOrderInput | SortOrder;
    companyName?: SortOrderInput | SortOrder;
    screenName?: SortOrderInput | SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EventRecordWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: EventRecordWhereInput | EventRecordWhereInput[];
      OR?: EventRecordWhereInput[];
      NOT?: EventRecordWhereInput | EventRecordWhereInput[];
      title?: StringFilter<'EventRecord'> | string;
      clientName?: StringNullableFilter<'EventRecord'> | string | null;
      companyName?: StringNullableFilter<'EventRecord'> | string | null;
      screenName?: StringNullableFilter<'EventRecord'> | string | null;
      startAt?: DateTimeFilter<'EventRecord'> | Date | string;
      endAt?: DateTimeNullableFilter<'EventRecord'> | Date | string | null;
      status?: EnumRecordStatusFilter<'EventRecord'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'EventRecord'> | Date | string;
      updatedAt?: DateTimeFilter<'EventRecord'> | Date | string;
    },
    'id'
  >;

  export type EventRecordOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    clientName?: SortOrderInput | SortOrder;
    companyName?: SortOrderInput | SortOrder;
    screenName?: SortOrderInput | SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: EventRecordCountOrderByAggregateInput;
    _max?: EventRecordMaxOrderByAggregateInput;
    _min?: EventRecordMinOrderByAggregateInput;
  };

  export type EventRecordScalarWhereWithAggregatesInput = {
    AND?: EventRecordScalarWhereWithAggregatesInput | EventRecordScalarWhereWithAggregatesInput[];
    OR?: EventRecordScalarWhereWithAggregatesInput[];
    NOT?: EventRecordScalarWhereWithAggregatesInput | EventRecordScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'EventRecord'> | string;
    title?: StringWithAggregatesFilter<'EventRecord'> | string;
    clientName?: StringNullableWithAggregatesFilter<'EventRecord'> | string | null;
    companyName?: StringNullableWithAggregatesFilter<'EventRecord'> | string | null;
    screenName?: StringNullableWithAggregatesFilter<'EventRecord'> | string | null;
    startAt?: DateTimeWithAggregatesFilter<'EventRecord'> | Date | string;
    endAt?: DateTimeNullableWithAggregatesFilter<'EventRecord'> | Date | string | null;
    status?: EnumRecordStatusWithAggregatesFilter<'EventRecord'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'EventRecord'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'EventRecord'> | Date | string;
  };

  export type MeetingScheduleWhereInput = {
    AND?: MeetingScheduleWhereInput | MeetingScheduleWhereInput[];
    OR?: MeetingScheduleWhereInput[];
    NOT?: MeetingScheduleWhereInput | MeetingScheduleWhereInput[];
    id?: StringFilter<'MeetingSchedule'> | string;
    title?: StringFilter<'MeetingSchedule'> | string;
    location?: StringNullableFilter<'MeetingSchedule'> | string | null;
    organizer?: StringNullableFilter<'MeetingSchedule'> | string | null;
    startAt?: DateTimeFilter<'MeetingSchedule'> | Date | string;
    endAt?: DateTimeNullableFilter<'MeetingSchedule'> | Date | string | null;
    status?: EnumRecordStatusFilter<'MeetingSchedule'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'MeetingSchedule'> | Date | string;
    updatedAt?: DateTimeFilter<'MeetingSchedule'> | Date | string;
  };

  export type MeetingScheduleOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    location?: SortOrderInput | SortOrder;
    organizer?: SortOrderInput | SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MeetingScheduleWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MeetingScheduleWhereInput | MeetingScheduleWhereInput[];
      OR?: MeetingScheduleWhereInput[];
      NOT?: MeetingScheduleWhereInput | MeetingScheduleWhereInput[];
      title?: StringFilter<'MeetingSchedule'> | string;
      location?: StringNullableFilter<'MeetingSchedule'> | string | null;
      organizer?: StringNullableFilter<'MeetingSchedule'> | string | null;
      startAt?: DateTimeFilter<'MeetingSchedule'> | Date | string;
      endAt?: DateTimeNullableFilter<'MeetingSchedule'> | Date | string | null;
      status?: EnumRecordStatusFilter<'MeetingSchedule'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'MeetingSchedule'> | Date | string;
      updatedAt?: DateTimeFilter<'MeetingSchedule'> | Date | string;
    },
    'id'
  >;

  export type MeetingScheduleOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    location?: SortOrderInput | SortOrder;
    organizer?: SortOrderInput | SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: MeetingScheduleCountOrderByAggregateInput;
    _max?: MeetingScheduleMaxOrderByAggregateInput;
    _min?: MeetingScheduleMinOrderByAggregateInput;
  };

  export type MeetingScheduleScalarWhereWithAggregatesInput = {
    AND?:
      | MeetingScheduleScalarWhereWithAggregatesInput
      | MeetingScheduleScalarWhereWithAggregatesInput[];
    OR?: MeetingScheduleScalarWhereWithAggregatesInput[];
    NOT?:
      | MeetingScheduleScalarWhereWithAggregatesInput
      | MeetingScheduleScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'MeetingSchedule'> | string;
    title?: StringWithAggregatesFilter<'MeetingSchedule'> | string;
    location?: StringNullableWithAggregatesFilter<'MeetingSchedule'> | string | null;
    organizer?: StringNullableWithAggregatesFilter<'MeetingSchedule'> | string | null;
    startAt?: DateTimeWithAggregatesFilter<'MeetingSchedule'> | Date | string;
    endAt?: DateTimeNullableWithAggregatesFilter<'MeetingSchedule'> | Date | string | null;
    status?: EnumRecordStatusWithAggregatesFilter<'MeetingSchedule'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'MeetingSchedule'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'MeetingSchedule'> | Date | string;
  };

  export type AdvertisementWhereInput = {
    AND?: AdvertisementWhereInput | AdvertisementWhereInput[];
    OR?: AdvertisementWhereInput[];
    NOT?: AdvertisementWhereInput | AdvertisementWhereInput[];
    id?: StringFilter<'Advertisement'> | string;
    title?: StringFilter<'Advertisement'> | string;
    mediaUrl?: StringFilter<'Advertisement'> | string;
    mediaType?: EnumAdMediaTypeFilter<'Advertisement'> | $Enums.AdMediaType;
    duration?: IntNullableFilter<'Advertisement'> | number | null;
    sortOrder?: IntFilter<'Advertisement'> | number;
    status?: EnumRecordStatusFilter<'Advertisement'> | $Enums.RecordStatus;
    startAt?: DateTimeNullableFilter<'Advertisement'> | Date | string | null;
    endAt?: DateTimeNullableFilter<'Advertisement'> | Date | string | null;
    createdAt?: DateTimeFilter<'Advertisement'> | Date | string;
    updatedAt?: DateTimeFilter<'Advertisement'> | Date | string;
  };

  export type AdvertisementOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrder;
    mediaUrl?: SortOrder;
    mediaType?: SortOrder;
    duration?: SortOrderInput | SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    startAt?: SortOrderInput | SortOrder;
    endAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdvertisementWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AdvertisementWhereInput | AdvertisementWhereInput[];
      OR?: AdvertisementWhereInput[];
      NOT?: AdvertisementWhereInput | AdvertisementWhereInput[];
      title?: StringFilter<'Advertisement'> | string;
      mediaUrl?: StringFilter<'Advertisement'> | string;
      mediaType?: EnumAdMediaTypeFilter<'Advertisement'> | $Enums.AdMediaType;
      duration?: IntNullableFilter<'Advertisement'> | number | null;
      sortOrder?: IntFilter<'Advertisement'> | number;
      status?: EnumRecordStatusFilter<'Advertisement'> | $Enums.RecordStatus;
      startAt?: DateTimeNullableFilter<'Advertisement'> | Date | string | null;
      endAt?: DateTimeNullableFilter<'Advertisement'> | Date | string | null;
      createdAt?: DateTimeFilter<'Advertisement'> | Date | string;
      updatedAt?: DateTimeFilter<'Advertisement'> | Date | string;
    },
    'id'
  >;

  export type AdvertisementOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrder;
    mediaUrl?: SortOrder;
    mediaType?: SortOrder;
    duration?: SortOrderInput | SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    startAt?: SortOrderInput | SortOrder;
    endAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AdvertisementCountOrderByAggregateInput;
    _avg?: AdvertisementAvgOrderByAggregateInput;
    _max?: AdvertisementMaxOrderByAggregateInput;
    _min?: AdvertisementMinOrderByAggregateInput;
    _sum?: AdvertisementSumOrderByAggregateInput;
  };

  export type AdvertisementScalarWhereWithAggregatesInput = {
    AND?:
      | AdvertisementScalarWhereWithAggregatesInput
      | AdvertisementScalarWhereWithAggregatesInput[];
    OR?: AdvertisementScalarWhereWithAggregatesInput[];
    NOT?:
      | AdvertisementScalarWhereWithAggregatesInput
      | AdvertisementScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Advertisement'> | string;
    title?: StringWithAggregatesFilter<'Advertisement'> | string;
    mediaUrl?: StringWithAggregatesFilter<'Advertisement'> | string;
    mediaType?: EnumAdMediaTypeWithAggregatesFilter<'Advertisement'> | $Enums.AdMediaType;
    duration?: IntNullableWithAggregatesFilter<'Advertisement'> | number | null;
    sortOrder?: IntWithAggregatesFilter<'Advertisement'> | number;
    status?: EnumRecordStatusWithAggregatesFilter<'Advertisement'> | $Enums.RecordStatus;
    startAt?: DateTimeNullableWithAggregatesFilter<'Advertisement'> | Date | string | null;
    endAt?: DateTimeNullableWithAggregatesFilter<'Advertisement'> | Date | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'Advertisement'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Advertisement'> | Date | string;
  };

  export type WeatherSettingWhereInput = {
    AND?: WeatherSettingWhereInput | WeatherSettingWhereInput[];
    OR?: WeatherSettingWhereInput[];
    NOT?: WeatherSettingWhereInput | WeatherSettingWhereInput[];
    id?: StringFilter<'WeatherSetting'> | string;
    city?: StringFilter<'WeatherSetting'> | string;
    provider?: StringFilter<'WeatherSetting'> | string;
    apiKey?: StringNullableFilter<'WeatherSetting'> | string | null;
    enabled?: BoolFilter<'WeatherSetting'> | boolean;
    createdAt?: DateTimeFilter<'WeatherSetting'> | Date | string;
    updatedAt?: DateTimeFilter<'WeatherSetting'> | Date | string;
  };

  export type WeatherSettingOrderByWithRelationInput = {
    id?: SortOrder;
    city?: SortOrder;
    provider?: SortOrder;
    apiKey?: SortOrderInput | SortOrder;
    enabled?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WeatherSettingWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: WeatherSettingWhereInput | WeatherSettingWhereInput[];
      OR?: WeatherSettingWhereInput[];
      NOT?: WeatherSettingWhereInput | WeatherSettingWhereInput[];
      city?: StringFilter<'WeatherSetting'> | string;
      provider?: StringFilter<'WeatherSetting'> | string;
      apiKey?: StringNullableFilter<'WeatherSetting'> | string | null;
      enabled?: BoolFilter<'WeatherSetting'> | boolean;
      createdAt?: DateTimeFilter<'WeatherSetting'> | Date | string;
      updatedAt?: DateTimeFilter<'WeatherSetting'> | Date | string;
    },
    'id'
  >;

  export type WeatherSettingOrderByWithAggregationInput = {
    id?: SortOrder;
    city?: SortOrder;
    provider?: SortOrder;
    apiKey?: SortOrderInput | SortOrder;
    enabled?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: WeatherSettingCountOrderByAggregateInput;
    _max?: WeatherSettingMaxOrderByAggregateInput;
    _min?: WeatherSettingMinOrderByAggregateInput;
  };

  export type WeatherSettingScalarWhereWithAggregatesInput = {
    AND?:
      | WeatherSettingScalarWhereWithAggregatesInput
      | WeatherSettingScalarWhereWithAggregatesInput[];
    OR?: WeatherSettingScalarWhereWithAggregatesInput[];
    NOT?:
      | WeatherSettingScalarWhereWithAggregatesInput
      | WeatherSettingScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'WeatherSetting'> | string;
    city?: StringWithAggregatesFilter<'WeatherSetting'> | string;
    provider?: StringWithAggregatesFilter<'WeatherSetting'> | string;
    apiKey?: StringNullableWithAggregatesFilter<'WeatherSetting'> | string | null;
    enabled?: BoolWithAggregatesFilter<'WeatherSetting'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'WeatherSetting'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'WeatherSetting'> | Date | string;
  };

  export type MovieScheduleWhereInput = {
    AND?: MovieScheduleWhereInput | MovieScheduleWhereInput[];
    OR?: MovieScheduleWhereInput[];
    NOT?: MovieScheduleWhereInput | MovieScheduleWhereInput[];
    id?: StringFilter<'MovieSchedule'> | string;
    movieName?: StringFilter<'MovieSchedule'> | string;
    screenName?: StringFilter<'MovieSchedule'> | string;
    showTime?: DateTimeFilter<'MovieSchedule'> | Date | string;
    status?: EnumRecordStatusFilter<'MovieSchedule'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'MovieSchedule'> | Date | string;
    updatedAt?: DateTimeFilter<'MovieSchedule'> | Date | string;
  };

  export type MovieScheduleOrderByWithRelationInput = {
    id?: SortOrder;
    movieName?: SortOrder;
    screenName?: SortOrder;
    showTime?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MovieScheduleWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MovieScheduleWhereInput | MovieScheduleWhereInput[];
      OR?: MovieScheduleWhereInput[];
      NOT?: MovieScheduleWhereInput | MovieScheduleWhereInput[];
      movieName?: StringFilter<'MovieSchedule'> | string;
      screenName?: StringFilter<'MovieSchedule'> | string;
      showTime?: DateTimeFilter<'MovieSchedule'> | Date | string;
      status?: EnumRecordStatusFilter<'MovieSchedule'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'MovieSchedule'> | Date | string;
      updatedAt?: DateTimeFilter<'MovieSchedule'> | Date | string;
    },
    'id'
  >;

  export type MovieScheduleOrderByWithAggregationInput = {
    id?: SortOrder;
    movieName?: SortOrder;
    screenName?: SortOrder;
    showTime?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: MovieScheduleCountOrderByAggregateInput;
    _max?: MovieScheduleMaxOrderByAggregateInput;
    _min?: MovieScheduleMinOrderByAggregateInput;
  };

  export type MovieScheduleScalarWhereWithAggregatesInput = {
    AND?:
      | MovieScheduleScalarWhereWithAggregatesInput
      | MovieScheduleScalarWhereWithAggregatesInput[];
    OR?: MovieScheduleScalarWhereWithAggregatesInput[];
    NOT?:
      | MovieScheduleScalarWhereWithAggregatesInput
      | MovieScheduleScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'MovieSchedule'> | string;
    movieName?: StringWithAggregatesFilter<'MovieSchedule'> | string;
    screenName?: StringWithAggregatesFilter<'MovieSchedule'> | string;
    showTime?: DateTimeWithAggregatesFilter<'MovieSchedule'> | Date | string;
    status?: EnumRecordStatusWithAggregatesFilter<'MovieSchedule'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'MovieSchedule'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'MovieSchedule'> | Date | string;
  };

  export type ItemSalesTargetWhereInput = {
    AND?: ItemSalesTargetWhereInput | ItemSalesTargetWhereInput[];
    OR?: ItemSalesTargetWhereInput[];
    NOT?: ItemSalesTargetWhereInput | ItemSalesTargetWhereInput[];
    id?: StringFilter<'ItemSalesTarget'> | string;
    itemName?: StringFilter<'ItemSalesTarget'> | string;
    itemCode?: StringNullableFilter<'ItemSalesTarget'> | string | null;
    dailyTarget?: IntNullableFilter<'ItemSalesTarget'> | number | null;
    weeklyTarget?: IntNullableFilter<'ItemSalesTarget'> | number | null;
    monthlyTarget?: IntNullableFilter<'ItemSalesTarget'> | number | null;
    status?: EnumRecordStatusFilter<'ItemSalesTarget'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'ItemSalesTarget'> | Date | string;
    updatedAt?: DateTimeFilter<'ItemSalesTarget'> | Date | string;
  };

  export type ItemSalesTargetOrderByWithRelationInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    itemCode?: SortOrderInput | SortOrder;
    dailyTarget?: SortOrderInput | SortOrder;
    weeklyTarget?: SortOrderInput | SortOrder;
    monthlyTarget?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ItemSalesTargetWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ItemSalesTargetWhereInput | ItemSalesTargetWhereInput[];
      OR?: ItemSalesTargetWhereInput[];
      NOT?: ItemSalesTargetWhereInput | ItemSalesTargetWhereInput[];
      itemName?: StringFilter<'ItemSalesTarget'> | string;
      itemCode?: StringNullableFilter<'ItemSalesTarget'> | string | null;
      dailyTarget?: IntNullableFilter<'ItemSalesTarget'> | number | null;
      weeklyTarget?: IntNullableFilter<'ItemSalesTarget'> | number | null;
      monthlyTarget?: IntNullableFilter<'ItemSalesTarget'> | number | null;
      status?: EnumRecordStatusFilter<'ItemSalesTarget'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'ItemSalesTarget'> | Date | string;
      updatedAt?: DateTimeFilter<'ItemSalesTarget'> | Date | string;
    },
    'id'
  >;

  export type ItemSalesTargetOrderByWithAggregationInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    itemCode?: SortOrderInput | SortOrder;
    dailyTarget?: SortOrderInput | SortOrder;
    weeklyTarget?: SortOrderInput | SortOrder;
    monthlyTarget?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ItemSalesTargetCountOrderByAggregateInput;
    _avg?: ItemSalesTargetAvgOrderByAggregateInput;
    _max?: ItemSalesTargetMaxOrderByAggregateInput;
    _min?: ItemSalesTargetMinOrderByAggregateInput;
    _sum?: ItemSalesTargetSumOrderByAggregateInput;
  };

  export type ItemSalesTargetScalarWhereWithAggregatesInput = {
    AND?:
      | ItemSalesTargetScalarWhereWithAggregatesInput
      | ItemSalesTargetScalarWhereWithAggregatesInput[];
    OR?: ItemSalesTargetScalarWhereWithAggregatesInput[];
    NOT?:
      | ItemSalesTargetScalarWhereWithAggregatesInput
      | ItemSalesTargetScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'ItemSalesTarget'> | string;
    itemName?: StringWithAggregatesFilter<'ItemSalesTarget'> | string;
    itemCode?: StringNullableWithAggregatesFilter<'ItemSalesTarget'> | string | null;
    dailyTarget?: IntNullableWithAggregatesFilter<'ItemSalesTarget'> | number | null;
    weeklyTarget?: IntNullableWithAggregatesFilter<'ItemSalesTarget'> | number | null;
    monthlyTarget?: IntNullableWithAggregatesFilter<'ItemSalesTarget'> | number | null;
    status?: EnumRecordStatusWithAggregatesFilter<'ItemSalesTarget'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'ItemSalesTarget'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'ItemSalesTarget'> | Date | string;
  };

  export type ConcessionPriceItemWhereInput = {
    AND?: ConcessionPriceItemWhereInput | ConcessionPriceItemWhereInput[];
    OR?: ConcessionPriceItemWhereInput[];
    NOT?: ConcessionPriceItemWhereInput | ConcessionPriceItemWhereInput[];
    id?: StringFilter<'ConcessionPriceItem'> | string;
    itemName?: StringFilter<'ConcessionPriceItem'> | string;
    category?: StringNullableFilter<'ConcessionPriceItem'> | string | null;
    price?: FloatFilter<'ConcessionPriceItem'> | number;
    sortOrder?: IntFilter<'ConcessionPriceItem'> | number;
    status?: EnumRecordStatusFilter<'ConcessionPriceItem'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'ConcessionPriceItem'> | Date | string;
    updatedAt?: DateTimeFilter<'ConcessionPriceItem'> | Date | string;
  };

  export type ConcessionPriceItemOrderByWithRelationInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    category?: SortOrderInput | SortOrder;
    price?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ConcessionPriceItemWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ConcessionPriceItemWhereInput | ConcessionPriceItemWhereInput[];
      OR?: ConcessionPriceItemWhereInput[];
      NOT?: ConcessionPriceItemWhereInput | ConcessionPriceItemWhereInput[];
      itemName?: StringFilter<'ConcessionPriceItem'> | string;
      category?: StringNullableFilter<'ConcessionPriceItem'> | string | null;
      price?: FloatFilter<'ConcessionPriceItem'> | number;
      sortOrder?: IntFilter<'ConcessionPriceItem'> | number;
      status?: EnumRecordStatusFilter<'ConcessionPriceItem'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'ConcessionPriceItem'> | Date | string;
      updatedAt?: DateTimeFilter<'ConcessionPriceItem'> | Date | string;
    },
    'id'
  >;

  export type ConcessionPriceItemOrderByWithAggregationInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    category?: SortOrderInput | SortOrder;
    price?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ConcessionPriceItemCountOrderByAggregateInput;
    _avg?: ConcessionPriceItemAvgOrderByAggregateInput;
    _max?: ConcessionPriceItemMaxOrderByAggregateInput;
    _min?: ConcessionPriceItemMinOrderByAggregateInput;
    _sum?: ConcessionPriceItemSumOrderByAggregateInput;
  };

  export type ConcessionPriceItemScalarWhereWithAggregatesInput = {
    AND?:
      | ConcessionPriceItemScalarWhereWithAggregatesInput
      | ConcessionPriceItemScalarWhereWithAggregatesInput[];
    OR?: ConcessionPriceItemScalarWhereWithAggregatesInput[];
    NOT?:
      | ConcessionPriceItemScalarWhereWithAggregatesInput
      | ConcessionPriceItemScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'ConcessionPriceItem'> | string;
    itemName?: StringWithAggregatesFilter<'ConcessionPriceItem'> | string;
    category?: StringNullableWithAggregatesFilter<'ConcessionPriceItem'> | string | null;
    price?: FloatWithAggregatesFilter<'ConcessionPriceItem'> | number;
    sortOrder?: IntWithAggregatesFilter<'ConcessionPriceItem'> | number;
    status?: EnumRecordStatusWithAggregatesFilter<'ConcessionPriceItem'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'ConcessionPriceItem'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'ConcessionPriceItem'> | Date | string;
  };

  export type DisplayPageWhereInput = {
    AND?: DisplayPageWhereInput | DisplayPageWhereInput[];
    OR?: DisplayPageWhereInput[];
    NOT?: DisplayPageWhereInput | DisplayPageWhereInput[];
    id?: StringFilter<'DisplayPage'> | string;
    name?: StringFilter<'DisplayPage'> | string;
    slug?: StringFilter<'DisplayPage'> | string;
    description?: StringNullableFilter<'DisplayPage'> | string | null;
    status?: EnumRecordStatusFilter<'DisplayPage'> | $Enums.RecordStatus;
    createdAt?: DateTimeFilter<'DisplayPage'> | Date | string;
    updatedAt?: DateTimeFilter<'DisplayPage'> | Date | string;
  };

  export type DisplayPageOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DisplayPageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      slug?: string;
      AND?: DisplayPageWhereInput | DisplayPageWhereInput[];
      OR?: DisplayPageWhereInput[];
      NOT?: DisplayPageWhereInput | DisplayPageWhereInput[];
      name?: StringFilter<'DisplayPage'> | string;
      description?: StringNullableFilter<'DisplayPage'> | string | null;
      status?: EnumRecordStatusFilter<'DisplayPage'> | $Enums.RecordStatus;
      createdAt?: DateTimeFilter<'DisplayPage'> | Date | string;
      updatedAt?: DateTimeFilter<'DisplayPage'> | Date | string;
    },
    'id' | 'slug'
  >;

  export type DisplayPageOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: DisplayPageCountOrderByAggregateInput;
    _max?: DisplayPageMaxOrderByAggregateInput;
    _min?: DisplayPageMinOrderByAggregateInput;
  };

  export type DisplayPageScalarWhereWithAggregatesInput = {
    AND?: DisplayPageScalarWhereWithAggregatesInput | DisplayPageScalarWhereWithAggregatesInput[];
    OR?: DisplayPageScalarWhereWithAggregatesInput[];
    NOT?: DisplayPageScalarWhereWithAggregatesInput | DisplayPageScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'DisplayPage'> | string;
    name?: StringWithAggregatesFilter<'DisplayPage'> | string;
    slug?: StringWithAggregatesFilter<'DisplayPage'> | string;
    description?: StringNullableWithAggregatesFilter<'DisplayPage'> | string | null;
    status?: EnumRecordStatusWithAggregatesFilter<'DisplayPage'> | $Enums.RecordStatus;
    createdAt?: DateTimeWithAggregatesFilter<'DisplayPage'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'DisplayPage'> | Date | string;
  };

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[];
    OR?: SystemSettingWhereInput[];
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[];
    id?: StringFilter<'SystemSetting'> | string;
    key?: StringFilter<'SystemSetting'> | string;
    value?: StringFilter<'SystemSetting'> | string;
    createdAt?: DateTimeFilter<'SystemSetting'> | Date | string;
    updatedAt?: DateTimeFilter<'SystemSetting'> | Date | string;
  };

  export type SystemSettingOrderByWithRelationInput = {
    id?: SortOrder;
    key?: SortOrder;
    value?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      key?: string;
      AND?: SystemSettingWhereInput | SystemSettingWhereInput[];
      OR?: SystemSettingWhereInput[];
      NOT?: SystemSettingWhereInput | SystemSettingWhereInput[];
      value?: StringFilter<'SystemSetting'> | string;
      createdAt?: DateTimeFilter<'SystemSetting'> | Date | string;
      updatedAt?: DateTimeFilter<'SystemSetting'> | Date | string;
    },
    'id' | 'key'
  >;

  export type SystemSettingOrderByWithAggregationInput = {
    id?: SortOrder;
    key?: SortOrder;
    value?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: SystemSettingCountOrderByAggregateInput;
    _max?: SystemSettingMaxOrderByAggregateInput;
    _min?: SystemSettingMinOrderByAggregateInput;
  };

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?:
      | SystemSettingScalarWhereWithAggregatesInput
      | SystemSettingScalarWhereWithAggregatesInput[];
    OR?: SystemSettingScalarWhereWithAggregatesInput[];
    NOT?:
      | SystemSettingScalarWhereWithAggregatesInput
      | SystemSettingScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'SystemSetting'> | string;
    key?: StringWithAggregatesFilter<'SystemSetting'> | string;
    value?: StringWithAggregatesFilter<'SystemSetting'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'SystemSetting'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'SystemSetting'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    permissions?: UserCreatepermissionsInput | string[];
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    permissions?: UserCreatepermissionsInput | string[];
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    permissions?: UserUpdatepermissionsInput | string[];
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    permissions?: UserUpdatepermissionsInput | string[];
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    password: string;
    role?: string;
    permissions?: UserCreatepermissionsInput | string[];
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    permissions?: UserUpdatepermissionsInput | string[];
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    permissions?: UserUpdatepermissionsInput | string[];
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StaffMemberCreateInput = {
    id?: string;
    name: string;
    designation: string;
    department?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendanceRecords?: AttendanceRecordCreateNestedManyWithoutStaffInput;
  };

  export type StaffMemberUncheckedCreateInput = {
    id?: string;
    name: string;
    designation: string;
    department?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendanceRecords?: AttendanceRecordUncheckedCreateNestedManyWithoutStaffInput;
  };

  export type StaffMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: StringFieldUpdateOperationsInput | string;
    department?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    attendanceRecords?: AttendanceRecordUpdateManyWithoutStaffNestedInput;
  };

  export type StaffMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: StringFieldUpdateOperationsInput | string;
    department?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    attendanceRecords?: AttendanceRecordUncheckedUpdateManyWithoutStaffNestedInput;
  };

  export type StaffMemberCreateManyInput = {
    id?: string;
    name: string;
    designation: string;
    department?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type StaffMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: StringFieldUpdateOperationsInput | string;
    department?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StaffMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: StringFieldUpdateOperationsInput | string;
    department?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerCreateInput = {
    id?: string;
    name: string;
    designation?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendanceRecords?: ManagerAttendanceRecordCreateNestedManyWithoutManagerInput;
  };

  export type ManagerUncheckedCreateInput = {
    id?: string;
    name: string;
    designation?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    attendanceRecords?: ManagerAttendanceRecordUncheckedCreateNestedManyWithoutManagerInput;
  };

  export type ManagerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    attendanceRecords?: ManagerAttendanceRecordUpdateManyWithoutManagerNestedInput;
  };

  export type ManagerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    attendanceRecords?: ManagerAttendanceRecordUncheckedUpdateManyWithoutManagerNestedInput;
  };

  export type ManagerCreateManyInput = {
    id?: string;
    name: string;
    designation?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttendanceRecordCreateInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    staff: StaffMemberCreateNestedOneWithoutAttendanceRecordsInput;
  };

  export type AttendanceRecordUncheckedCreateInput = {
    id?: string;
    staffId: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AttendanceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    staff?: StaffMemberUpdateOneRequiredWithoutAttendanceRecordsNestedInput;
  };

  export type AttendanceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    staffId?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttendanceRecordCreateManyInput = {
    id?: string;
    staffId: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AttendanceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttendanceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    staffId?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerAttendanceRecordCreateInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    manager: ManagerCreateNestedOneWithoutAttendanceRecordsInput;
  };

  export type ManagerAttendanceRecordUncheckedCreateInput = {
    id?: string;
    managerId: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerAttendanceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    manager?: ManagerUpdateOneRequiredWithoutAttendanceRecordsNestedInput;
  };

  export type ManagerAttendanceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    managerId?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerAttendanceRecordCreateManyInput = {
    id?: string;
    managerId: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerAttendanceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerAttendanceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    managerId?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventRecordCreateInput = {
    id?: string;
    title: string;
    clientName?: string | null;
    companyName?: string | null;
    screenName?: string | null;
    startAt: Date | string;
    endAt?: Date | string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EventRecordUncheckedCreateInput = {
    id?: string;
    title: string;
    clientName?: string | null;
    companyName?: string | null;
    screenName?: string | null;
    startAt: Date | string;
    endAt?: Date | string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EventRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    clientName?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: NullableStringFieldUpdateOperationsInput | string | null;
    screenName?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    clientName?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: NullableStringFieldUpdateOperationsInput | string | null;
    screenName?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventRecordCreateManyInput = {
    id?: string;
    title: string;
    clientName?: string | null;
    companyName?: string | null;
    screenName?: string | null;
    startAt: Date | string;
    endAt?: Date | string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type EventRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    clientName?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: NullableStringFieldUpdateOperationsInput | string | null;
    screenName?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type EventRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    clientName?: NullableStringFieldUpdateOperationsInput | string | null;
    companyName?: NullableStringFieldUpdateOperationsInput | string | null;
    screenName?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MeetingScheduleCreateInput = {
    id?: string;
    title: string;
    location?: string | null;
    organizer?: string | null;
    startAt: Date | string;
    endAt?: Date | string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MeetingScheduleUncheckedCreateInput = {
    id?: string;
    title: string;
    location?: string | null;
    organizer?: string | null;
    startAt: Date | string;
    endAt?: Date | string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MeetingScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    organizer?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MeetingScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    organizer?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MeetingScheduleCreateManyInput = {
    id?: string;
    title: string;
    location?: string | null;
    organizer?: string | null;
    startAt: Date | string;
    endAt?: Date | string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MeetingScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    organizer?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MeetingScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    location?: NullableStringFieldUpdateOperationsInput | string | null;
    organizer?: NullableStringFieldUpdateOperationsInput | string | null;
    startAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdvertisementCreateInput = {
    id?: string;
    title: string;
    mediaUrl: string;
    mediaType: $Enums.AdMediaType;
    duration?: number | null;
    sortOrder?: number;
    status?: $Enums.RecordStatus;
    startAt?: Date | string | null;
    endAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdvertisementUncheckedCreateInput = {
    id?: string;
    title: string;
    mediaUrl: string;
    mediaType: $Enums.AdMediaType;
    duration?: number | null;
    sortOrder?: number;
    status?: $Enums.RecordStatus;
    startAt?: Date | string | null;
    endAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdvertisementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mediaUrl?: StringFieldUpdateOperationsInput | string;
    mediaType?: EnumAdMediaTypeFieldUpdateOperationsInput | $Enums.AdMediaType;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdvertisementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mediaUrl?: StringFieldUpdateOperationsInput | string;
    mediaType?: EnumAdMediaTypeFieldUpdateOperationsInput | $Enums.AdMediaType;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdvertisementCreateManyInput = {
    id?: string;
    title: string;
    mediaUrl: string;
    mediaType: $Enums.AdMediaType;
    duration?: number | null;
    sortOrder?: number;
    status?: $Enums.RecordStatus;
    startAt?: Date | string | null;
    endAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdvertisementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mediaUrl?: StringFieldUpdateOperationsInput | string;
    mediaType?: EnumAdMediaTypeFieldUpdateOperationsInput | $Enums.AdMediaType;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdvertisementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mediaUrl?: StringFieldUpdateOperationsInput | string;
    mediaType?: EnumAdMediaTypeFieldUpdateOperationsInput | $Enums.AdMediaType;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    startAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WeatherSettingCreateInput = {
    id?: string;
    city: string;
    provider?: string;
    apiKey?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WeatherSettingUncheckedCreateInput = {
    id?: string;
    city: string;
    provider?: string;
    apiKey?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WeatherSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WeatherSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WeatherSettingCreateManyInput = {
    id?: string;
    city: string;
    provider?: string;
    apiKey?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type WeatherSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WeatherSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    city?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    apiKey?: NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MovieScheduleCreateInput = {
    id?: string;
    movieName: string;
    screenName: string;
    showTime: Date | string;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MovieScheduleUncheckedCreateInput = {
    id?: string;
    movieName: string;
    screenName: string;
    showTime: Date | string;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MovieScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    movieName?: StringFieldUpdateOperationsInput | string;
    screenName?: StringFieldUpdateOperationsInput | string;
    showTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MovieScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    movieName?: StringFieldUpdateOperationsInput | string;
    screenName?: StringFieldUpdateOperationsInput | string;
    showTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MovieScheduleCreateManyInput = {
    id?: string;
    movieName: string;
    screenName: string;
    showTime: Date | string;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type MovieScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    movieName?: StringFieldUpdateOperationsInput | string;
    screenName?: StringFieldUpdateOperationsInput | string;
    showTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MovieScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    movieName?: StringFieldUpdateOperationsInput | string;
    screenName?: StringFieldUpdateOperationsInput | string;
    showTime?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemSalesTargetCreateInput = {
    id?: string;
    itemName: string;
    itemCode?: string | null;
    dailyTarget?: number | null;
    weeklyTarget?: number | null;
    monthlyTarget?: number | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ItemSalesTargetUncheckedCreateInput = {
    id?: string;
    itemName: string;
    itemCode?: string | null;
    dailyTarget?: number | null;
    weeklyTarget?: number | null;
    monthlyTarget?: number | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ItemSalesTargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    itemCode?: NullableStringFieldUpdateOperationsInput | string | null;
    dailyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    weeklyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    monthlyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemSalesTargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    itemCode?: NullableStringFieldUpdateOperationsInput | string | null;
    dailyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    weeklyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    monthlyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemSalesTargetCreateManyInput = {
    id?: string;
    itemName: string;
    itemCode?: string | null;
    dailyTarget?: number | null;
    weeklyTarget?: number | null;
    monthlyTarget?: number | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ItemSalesTargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    itemCode?: NullableStringFieldUpdateOperationsInput | string | null;
    dailyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    weeklyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    monthlyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ItemSalesTargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    itemCode?: NullableStringFieldUpdateOperationsInput | string | null;
    dailyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    weeklyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    monthlyTarget?: NullableIntFieldUpdateOperationsInput | number | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ConcessionPriceItemCreateInput = {
    id?: string;
    itemName: string;
    category?: string | null;
    price: number;
    sortOrder?: number;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ConcessionPriceItemUncheckedCreateInput = {
    id?: string;
    itemName: string;
    category?: string | null;
    price: number;
    sortOrder?: number;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ConcessionPriceItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ConcessionPriceItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ConcessionPriceItemCreateManyInput = {
    id?: string;
    itemName: string;
    category?: string | null;
    price: number;
    sortOrder?: number;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ConcessionPriceItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ConcessionPriceItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    itemName?: StringFieldUpdateOperationsInput | string;
    category?: NullableStringFieldUpdateOperationsInput | string | null;
    price?: FloatFieldUpdateOperationsInput | number;
    sortOrder?: IntFieldUpdateOperationsInput | number;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DisplayPageCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DisplayPageUncheckedCreateInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DisplayPageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DisplayPageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DisplayPageCreateManyInput = {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type DisplayPageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type DisplayPageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SystemSettingCreateInput = {
    id?: string;
    key: string;
    value: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SystemSettingUncheckedCreateInput = {
    id?: string;
    key: string;
    value: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SystemSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SystemSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SystemSettingCreateManyInput = {
    id?: string;
    key: string;
    value: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SystemSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SystemSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type EnumRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumRecordStatusFilter<$PrismaModel> | $Enums.RecordStatus;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    permissions?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    password?: SortOrder;
    role?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type EnumRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRecordStatusFilter<$PrismaModel>;
    _max?: NestedEnumRecordStatusFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type AttendanceRecordListRelationFilter = {
    every?: AttendanceRecordWhereInput;
    some?: AttendanceRecordWhereInput;
    none?: AttendanceRecordWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type AttendanceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type StaffMemberCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    department?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StaffMemberMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    department?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StaffMemberMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    department?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type ManagerAttendanceRecordListRelationFilter = {
    every?: ManagerAttendanceRecordWhereInput;
    some?: ManagerAttendanceRecordWhereInput;
    none?: ManagerAttendanceRecordWhereInput;
  };

  export type ManagerAttendanceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ManagerCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ManagerMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ManagerMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    designation?: SortOrder;
    phone?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus;
  };

  export type StaffMemberScalarRelationFilter = {
    is?: StaffMemberWhereInput;
    isNot?: StaffMemberWhereInput;
  };

  export type AttendanceRecordCountOrderByAggregateInput = {
    id?: SortOrder;
    staffId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrder;
    status?: SortOrder;
    remarks?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AttendanceRecordMaxOrderByAggregateInput = {
    id?: SortOrder;
    staffId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrder;
    status?: SortOrder;
    remarks?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AttendanceRecordMinOrderByAggregateInput = {
    id?: SortOrder;
    staffId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrder;
    status?: SortOrder;
    remarks?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>;
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>;
  };

  export type ManagerScalarRelationFilter = {
    is?: ManagerWhereInput;
    isNot?: ManagerWhereInput;
  };

  export type ManagerAttendanceRecordCountOrderByAggregateInput = {
    id?: SortOrder;
    managerId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrder;
    status?: SortOrder;
    remarks?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ManagerAttendanceRecordMaxOrderByAggregateInput = {
    id?: SortOrder;
    managerId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrder;
    status?: SortOrder;
    remarks?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ManagerAttendanceRecordMinOrderByAggregateInput = {
    id?: SortOrder;
    managerId?: SortOrder;
    date?: SortOrder;
    shift?: SortOrder;
    status?: SortOrder;
    remarks?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type EventRecordCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    clientName?: SortOrder;
    companyName?: SortOrder;
    screenName?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EventRecordMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    clientName?: SortOrder;
    companyName?: SortOrder;
    screenName?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EventRecordMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    clientName?: SortOrder;
    companyName?: SortOrder;
    screenName?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type MeetingScheduleCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    location?: SortOrder;
    organizer?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MeetingScheduleMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    location?: SortOrder;
    organizer?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MeetingScheduleMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    location?: SortOrder;
    organizer?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type EnumAdMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AdMediaType | EnumAdMediaTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAdMediaTypeFilter<$PrismaModel> | $Enums.AdMediaType;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type AdvertisementCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    mediaUrl?: SortOrder;
    mediaType?: SortOrder;
    duration?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdvertisementAvgOrderByAggregateInput = {
    duration?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type AdvertisementMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    mediaUrl?: SortOrder;
    mediaType?: SortOrder;
    duration?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdvertisementMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    mediaUrl?: SortOrder;
    mediaType?: SortOrder;
    duration?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    startAt?: SortOrder;
    endAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdvertisementSumOrderByAggregateInput = {
    duration?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type EnumAdMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdMediaType | EnumAdMediaTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAdMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.AdMediaType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAdMediaTypeFilter<$PrismaModel>;
    _max?: NestedEnumAdMediaTypeFilter<$PrismaModel>;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type WeatherSettingCountOrderByAggregateInput = {
    id?: SortOrder;
    city?: SortOrder;
    provider?: SortOrder;
    apiKey?: SortOrder;
    enabled?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WeatherSettingMaxOrderByAggregateInput = {
    id?: SortOrder;
    city?: SortOrder;
    provider?: SortOrder;
    apiKey?: SortOrder;
    enabled?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type WeatherSettingMinOrderByAggregateInput = {
    id?: SortOrder;
    city?: SortOrder;
    provider?: SortOrder;
    apiKey?: SortOrder;
    enabled?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type MovieScheduleCountOrderByAggregateInput = {
    id?: SortOrder;
    movieName?: SortOrder;
    screenName?: SortOrder;
    showTime?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MovieScheduleMaxOrderByAggregateInput = {
    id?: SortOrder;
    movieName?: SortOrder;
    screenName?: SortOrder;
    showTime?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type MovieScheduleMinOrderByAggregateInput = {
    id?: SortOrder;
    movieName?: SortOrder;
    screenName?: SortOrder;
    showTime?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ItemSalesTargetCountOrderByAggregateInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    itemCode?: SortOrder;
    dailyTarget?: SortOrder;
    weeklyTarget?: SortOrder;
    monthlyTarget?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ItemSalesTargetAvgOrderByAggregateInput = {
    dailyTarget?: SortOrder;
    weeklyTarget?: SortOrder;
    monthlyTarget?: SortOrder;
  };

  export type ItemSalesTargetMaxOrderByAggregateInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    itemCode?: SortOrder;
    dailyTarget?: SortOrder;
    weeklyTarget?: SortOrder;
    monthlyTarget?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ItemSalesTargetMinOrderByAggregateInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    itemCode?: SortOrder;
    dailyTarget?: SortOrder;
    weeklyTarget?: SortOrder;
    monthlyTarget?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ItemSalesTargetSumOrderByAggregateInput = {
    dailyTarget?: SortOrder;
    weeklyTarget?: SortOrder;
    monthlyTarget?: SortOrder;
  };

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type ConcessionPriceItemCountOrderByAggregateInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    category?: SortOrder;
    price?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ConcessionPriceItemAvgOrderByAggregateInput = {
    price?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type ConcessionPriceItemMaxOrderByAggregateInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    category?: SortOrder;
    price?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ConcessionPriceItemMinOrderByAggregateInput = {
    id?: SortOrder;
    itemName?: SortOrder;
    category?: SortOrder;
    price?: SortOrder;
    sortOrder?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ConcessionPriceItemSumOrderByAggregateInput = {
    price?: SortOrder;
    sortOrder?: SortOrder;
  };

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type DisplayPageCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DisplayPageMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type DisplayPageMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    slug?: SortOrder;
    description?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SystemSettingCountOrderByAggregateInput = {
    id?: SortOrder;
    key?: SortOrder;
    value?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SystemSettingMaxOrderByAggregateInput = {
    id?: SortOrder;
    key?: SortOrder;
    value?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type SystemSettingMinOrderByAggregateInput = {
    id?: SortOrder;
    key?: SortOrder;
    value?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserCreatepermissionsInput = {
    set: string[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type UserUpdatepermissionsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type EnumRecordStatusFieldUpdateOperationsInput = {
    set?: $Enums.RecordStatus;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type AttendanceRecordCreateNestedManyWithoutStaffInput = {
    create?:
      | XOR<
          AttendanceRecordCreateWithoutStaffInput,
          AttendanceRecordUncheckedCreateWithoutStaffInput
        >
      | AttendanceRecordCreateWithoutStaffInput[]
      | AttendanceRecordUncheckedCreateWithoutStaffInput[];
    connectOrCreate?:
      | AttendanceRecordCreateOrConnectWithoutStaffInput
      | AttendanceRecordCreateOrConnectWithoutStaffInput[];
    createMany?: AttendanceRecordCreateManyStaffInputEnvelope;
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
  };

  export type AttendanceRecordUncheckedCreateNestedManyWithoutStaffInput = {
    create?:
      | XOR<
          AttendanceRecordCreateWithoutStaffInput,
          AttendanceRecordUncheckedCreateWithoutStaffInput
        >
      | AttendanceRecordCreateWithoutStaffInput[]
      | AttendanceRecordUncheckedCreateWithoutStaffInput[];
    connectOrCreate?:
      | AttendanceRecordCreateOrConnectWithoutStaffInput
      | AttendanceRecordCreateOrConnectWithoutStaffInput[];
    createMany?: AttendanceRecordCreateManyStaffInputEnvelope;
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type AttendanceRecordUpdateManyWithoutStaffNestedInput = {
    create?:
      | XOR<
          AttendanceRecordCreateWithoutStaffInput,
          AttendanceRecordUncheckedCreateWithoutStaffInput
        >
      | AttendanceRecordCreateWithoutStaffInput[]
      | AttendanceRecordUncheckedCreateWithoutStaffInput[];
    connectOrCreate?:
      | AttendanceRecordCreateOrConnectWithoutStaffInput
      | AttendanceRecordCreateOrConnectWithoutStaffInput[];
    upsert?:
      | AttendanceRecordUpsertWithWhereUniqueWithoutStaffInput
      | AttendanceRecordUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: AttendanceRecordCreateManyStaffInputEnvelope;
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    update?:
      | AttendanceRecordUpdateWithWhereUniqueWithoutStaffInput
      | AttendanceRecordUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?:
      | AttendanceRecordUpdateManyWithWhereWithoutStaffInput
      | AttendanceRecordUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[];
  };

  export type AttendanceRecordUncheckedUpdateManyWithoutStaffNestedInput = {
    create?:
      | XOR<
          AttendanceRecordCreateWithoutStaffInput,
          AttendanceRecordUncheckedCreateWithoutStaffInput
        >
      | AttendanceRecordCreateWithoutStaffInput[]
      | AttendanceRecordUncheckedCreateWithoutStaffInput[];
    connectOrCreate?:
      | AttendanceRecordCreateOrConnectWithoutStaffInput
      | AttendanceRecordCreateOrConnectWithoutStaffInput[];
    upsert?:
      | AttendanceRecordUpsertWithWhereUniqueWithoutStaffInput
      | AttendanceRecordUpsertWithWhereUniqueWithoutStaffInput[];
    createMany?: AttendanceRecordCreateManyStaffInputEnvelope;
    set?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    disconnect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    delete?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    connect?: AttendanceRecordWhereUniqueInput | AttendanceRecordWhereUniqueInput[];
    update?:
      | AttendanceRecordUpdateWithWhereUniqueWithoutStaffInput
      | AttendanceRecordUpdateWithWhereUniqueWithoutStaffInput[];
    updateMany?:
      | AttendanceRecordUpdateManyWithWhereWithoutStaffInput
      | AttendanceRecordUpdateManyWithWhereWithoutStaffInput[];
    deleteMany?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[];
  };

  export type ManagerAttendanceRecordCreateNestedManyWithoutManagerInput = {
    create?:
      | XOR<
          ManagerAttendanceRecordCreateWithoutManagerInput,
          ManagerAttendanceRecordUncheckedCreateWithoutManagerInput
        >
      | ManagerAttendanceRecordCreateWithoutManagerInput[]
      | ManagerAttendanceRecordUncheckedCreateWithoutManagerInput[];
    connectOrCreate?:
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput[];
    createMany?: ManagerAttendanceRecordCreateManyManagerInputEnvelope;
    connect?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
  };

  export type ManagerAttendanceRecordUncheckedCreateNestedManyWithoutManagerInput = {
    create?:
      | XOR<
          ManagerAttendanceRecordCreateWithoutManagerInput,
          ManagerAttendanceRecordUncheckedCreateWithoutManagerInput
        >
      | ManagerAttendanceRecordCreateWithoutManagerInput[]
      | ManagerAttendanceRecordUncheckedCreateWithoutManagerInput[];
    connectOrCreate?:
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput[];
    createMany?: ManagerAttendanceRecordCreateManyManagerInputEnvelope;
    connect?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
  };

  export type ManagerAttendanceRecordUpdateManyWithoutManagerNestedInput = {
    create?:
      | XOR<
          ManagerAttendanceRecordCreateWithoutManagerInput,
          ManagerAttendanceRecordUncheckedCreateWithoutManagerInput
        >
      | ManagerAttendanceRecordCreateWithoutManagerInput[]
      | ManagerAttendanceRecordUncheckedCreateWithoutManagerInput[];
    connectOrCreate?:
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput[];
    upsert?:
      | ManagerAttendanceRecordUpsertWithWhereUniqueWithoutManagerInput
      | ManagerAttendanceRecordUpsertWithWhereUniqueWithoutManagerInput[];
    createMany?: ManagerAttendanceRecordCreateManyManagerInputEnvelope;
    set?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
    disconnect?:
      | ManagerAttendanceRecordWhereUniqueInput
      | ManagerAttendanceRecordWhereUniqueInput[];
    delete?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
    connect?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
    update?:
      | ManagerAttendanceRecordUpdateWithWhereUniqueWithoutManagerInput
      | ManagerAttendanceRecordUpdateWithWhereUniqueWithoutManagerInput[];
    updateMany?:
      | ManagerAttendanceRecordUpdateManyWithWhereWithoutManagerInput
      | ManagerAttendanceRecordUpdateManyWithWhereWithoutManagerInput[];
    deleteMany?:
      | ManagerAttendanceRecordScalarWhereInput
      | ManagerAttendanceRecordScalarWhereInput[];
  };

  export type ManagerAttendanceRecordUncheckedUpdateManyWithoutManagerNestedInput = {
    create?:
      | XOR<
          ManagerAttendanceRecordCreateWithoutManagerInput,
          ManagerAttendanceRecordUncheckedCreateWithoutManagerInput
        >
      | ManagerAttendanceRecordCreateWithoutManagerInput[]
      | ManagerAttendanceRecordUncheckedCreateWithoutManagerInput[];
    connectOrCreate?:
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput
      | ManagerAttendanceRecordCreateOrConnectWithoutManagerInput[];
    upsert?:
      | ManagerAttendanceRecordUpsertWithWhereUniqueWithoutManagerInput
      | ManagerAttendanceRecordUpsertWithWhereUniqueWithoutManagerInput[];
    createMany?: ManagerAttendanceRecordCreateManyManagerInputEnvelope;
    set?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
    disconnect?:
      | ManagerAttendanceRecordWhereUniqueInput
      | ManagerAttendanceRecordWhereUniqueInput[];
    delete?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
    connect?: ManagerAttendanceRecordWhereUniqueInput | ManagerAttendanceRecordWhereUniqueInput[];
    update?:
      | ManagerAttendanceRecordUpdateWithWhereUniqueWithoutManagerInput
      | ManagerAttendanceRecordUpdateWithWhereUniqueWithoutManagerInput[];
    updateMany?:
      | ManagerAttendanceRecordUpdateManyWithWhereWithoutManagerInput
      | ManagerAttendanceRecordUpdateManyWithWhereWithoutManagerInput[];
    deleteMany?:
      | ManagerAttendanceRecordScalarWhereInput
      | ManagerAttendanceRecordScalarWhereInput[];
  };

  export type StaffMemberCreateNestedOneWithoutAttendanceRecordsInput = {
    create?: XOR<
      StaffMemberCreateWithoutAttendanceRecordsInput,
      StaffMemberUncheckedCreateWithoutAttendanceRecordsInput
    >;
    connectOrCreate?: StaffMemberCreateOrConnectWithoutAttendanceRecordsInput;
    connect?: StaffMemberWhereUniqueInput;
  };

  export type EnumAttendanceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AttendanceStatus;
  };

  export type StaffMemberUpdateOneRequiredWithoutAttendanceRecordsNestedInput = {
    create?: XOR<
      StaffMemberCreateWithoutAttendanceRecordsInput,
      StaffMemberUncheckedCreateWithoutAttendanceRecordsInput
    >;
    connectOrCreate?: StaffMemberCreateOrConnectWithoutAttendanceRecordsInput;
    upsert?: StaffMemberUpsertWithoutAttendanceRecordsInput;
    connect?: StaffMemberWhereUniqueInput;
    update?: XOR<
      XOR<
        StaffMemberUpdateToOneWithWhereWithoutAttendanceRecordsInput,
        StaffMemberUpdateWithoutAttendanceRecordsInput
      >,
      StaffMemberUncheckedUpdateWithoutAttendanceRecordsInput
    >;
  };

  export type ManagerCreateNestedOneWithoutAttendanceRecordsInput = {
    create?: XOR<
      ManagerCreateWithoutAttendanceRecordsInput,
      ManagerUncheckedCreateWithoutAttendanceRecordsInput
    >;
    connectOrCreate?: ManagerCreateOrConnectWithoutAttendanceRecordsInput;
    connect?: ManagerWhereUniqueInput;
  };

  export type ManagerUpdateOneRequiredWithoutAttendanceRecordsNestedInput = {
    create?: XOR<
      ManagerCreateWithoutAttendanceRecordsInput,
      ManagerUncheckedCreateWithoutAttendanceRecordsInput
    >;
    connectOrCreate?: ManagerCreateOrConnectWithoutAttendanceRecordsInput;
    upsert?: ManagerUpsertWithoutAttendanceRecordsInput;
    connect?: ManagerWhereUniqueInput;
    update?: XOR<
      XOR<
        ManagerUpdateToOneWithWhereWithoutAttendanceRecordsInput,
        ManagerUpdateWithoutAttendanceRecordsInput
      >,
      ManagerUncheckedUpdateWithoutAttendanceRecordsInput
    >;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type EnumAdMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.AdMediaType;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedEnumRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumRecordStatusFilter<$PrismaModel> | $Enums.RecordStatus;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRecordStatusFilter<$PrismaModel>;
    _max?: NestedEnumRecordStatusFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedEnumAttendanceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumAttendanceStatusFilter<$PrismaModel> | $Enums.AttendanceStatus;
  };

  export type NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AttendanceStatus | EnumAttendanceStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AttendanceStatus[] | ListEnumAttendanceStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumAttendanceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AttendanceStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAttendanceStatusFilter<$PrismaModel>;
    _max?: NestedEnumAttendanceStatusFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type NestedEnumAdMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AdMediaType | EnumAdMediaTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAdMediaTypeFilter<$PrismaModel> | $Enums.AdMediaType;
  };

  export type NestedEnumAdMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdMediaType | EnumAdMediaTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AdMediaType[] | ListEnumAdMediaTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumAdMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.AdMediaType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumAdMediaTypeFilter<$PrismaModel>;
    _max?: NestedEnumAdMediaTypeFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedFloatFilter<$PrismaModel>;
    _min?: NestedFloatFilter<$PrismaModel>;
    _max?: NestedFloatFilter<$PrismaModel>;
  };

  export type AttendanceRecordCreateWithoutStaffInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AttendanceRecordUncheckedCreateWithoutStaffInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AttendanceRecordCreateOrConnectWithoutStaffInput = {
    where: AttendanceRecordWhereUniqueInput;
    create: XOR<
      AttendanceRecordCreateWithoutStaffInput,
      AttendanceRecordUncheckedCreateWithoutStaffInput
    >;
  };

  export type AttendanceRecordCreateManyStaffInputEnvelope = {
    data: AttendanceRecordCreateManyStaffInput | AttendanceRecordCreateManyStaffInput[];
    skipDuplicates?: boolean;
  };

  export type AttendanceRecordUpsertWithWhereUniqueWithoutStaffInput = {
    where: AttendanceRecordWhereUniqueInput;
    update: XOR<
      AttendanceRecordUpdateWithoutStaffInput,
      AttendanceRecordUncheckedUpdateWithoutStaffInput
    >;
    create: XOR<
      AttendanceRecordCreateWithoutStaffInput,
      AttendanceRecordUncheckedCreateWithoutStaffInput
    >;
  };

  export type AttendanceRecordUpdateWithWhereUniqueWithoutStaffInput = {
    where: AttendanceRecordWhereUniqueInput;
    data: XOR<
      AttendanceRecordUpdateWithoutStaffInput,
      AttendanceRecordUncheckedUpdateWithoutStaffInput
    >;
  };

  export type AttendanceRecordUpdateManyWithWhereWithoutStaffInput = {
    where: AttendanceRecordScalarWhereInput;
    data: XOR<
      AttendanceRecordUpdateManyMutationInput,
      AttendanceRecordUncheckedUpdateManyWithoutStaffInput
    >;
  };

  export type AttendanceRecordScalarWhereInput = {
    AND?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[];
    OR?: AttendanceRecordScalarWhereInput[];
    NOT?: AttendanceRecordScalarWhereInput | AttendanceRecordScalarWhereInput[];
    id?: StringFilter<'AttendanceRecord'> | string;
    staffId?: StringFilter<'AttendanceRecord'> | string;
    date?: DateTimeFilter<'AttendanceRecord'> | Date | string;
    shift?: StringNullableFilter<'AttendanceRecord'> | string | null;
    status?: EnumAttendanceStatusFilter<'AttendanceRecord'> | $Enums.AttendanceStatus;
    remarks?: StringNullableFilter<'AttendanceRecord'> | string | null;
    createdAt?: DateTimeFilter<'AttendanceRecord'> | Date | string;
    updatedAt?: DateTimeFilter<'AttendanceRecord'> | Date | string;
  };

  export type ManagerAttendanceRecordCreateWithoutManagerInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerAttendanceRecordUncheckedCreateWithoutManagerInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerAttendanceRecordCreateOrConnectWithoutManagerInput = {
    where: ManagerAttendanceRecordWhereUniqueInput;
    create: XOR<
      ManagerAttendanceRecordCreateWithoutManagerInput,
      ManagerAttendanceRecordUncheckedCreateWithoutManagerInput
    >;
  };

  export type ManagerAttendanceRecordCreateManyManagerInputEnvelope = {
    data:
      | ManagerAttendanceRecordCreateManyManagerInput
      | ManagerAttendanceRecordCreateManyManagerInput[];
    skipDuplicates?: boolean;
  };

  export type ManagerAttendanceRecordUpsertWithWhereUniqueWithoutManagerInput = {
    where: ManagerAttendanceRecordWhereUniqueInput;
    update: XOR<
      ManagerAttendanceRecordUpdateWithoutManagerInput,
      ManagerAttendanceRecordUncheckedUpdateWithoutManagerInput
    >;
    create: XOR<
      ManagerAttendanceRecordCreateWithoutManagerInput,
      ManagerAttendanceRecordUncheckedCreateWithoutManagerInput
    >;
  };

  export type ManagerAttendanceRecordUpdateWithWhereUniqueWithoutManagerInput = {
    where: ManagerAttendanceRecordWhereUniqueInput;
    data: XOR<
      ManagerAttendanceRecordUpdateWithoutManagerInput,
      ManagerAttendanceRecordUncheckedUpdateWithoutManagerInput
    >;
  };

  export type ManagerAttendanceRecordUpdateManyWithWhereWithoutManagerInput = {
    where: ManagerAttendanceRecordScalarWhereInput;
    data: XOR<
      ManagerAttendanceRecordUpdateManyMutationInput,
      ManagerAttendanceRecordUncheckedUpdateManyWithoutManagerInput
    >;
  };

  export type ManagerAttendanceRecordScalarWhereInput = {
    AND?: ManagerAttendanceRecordScalarWhereInput | ManagerAttendanceRecordScalarWhereInput[];
    OR?: ManagerAttendanceRecordScalarWhereInput[];
    NOT?: ManagerAttendanceRecordScalarWhereInput | ManagerAttendanceRecordScalarWhereInput[];
    id?: StringFilter<'ManagerAttendanceRecord'> | string;
    managerId?: StringFilter<'ManagerAttendanceRecord'> | string;
    date?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
    shift?: StringNullableFilter<'ManagerAttendanceRecord'> | string | null;
    status?: EnumAttendanceStatusFilter<'ManagerAttendanceRecord'> | $Enums.AttendanceStatus;
    remarks?: StringNullableFilter<'ManagerAttendanceRecord'> | string | null;
    createdAt?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
    updatedAt?: DateTimeFilter<'ManagerAttendanceRecord'> | Date | string;
  };

  export type StaffMemberCreateWithoutAttendanceRecordsInput = {
    id?: string;
    name: string;
    designation: string;
    department?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type StaffMemberUncheckedCreateWithoutAttendanceRecordsInput = {
    id?: string;
    name: string;
    designation: string;
    department?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type StaffMemberCreateOrConnectWithoutAttendanceRecordsInput = {
    where: StaffMemberWhereUniqueInput;
    create: XOR<
      StaffMemberCreateWithoutAttendanceRecordsInput,
      StaffMemberUncheckedCreateWithoutAttendanceRecordsInput
    >;
  };

  export type StaffMemberUpsertWithoutAttendanceRecordsInput = {
    update: XOR<
      StaffMemberUpdateWithoutAttendanceRecordsInput,
      StaffMemberUncheckedUpdateWithoutAttendanceRecordsInput
    >;
    create: XOR<
      StaffMemberCreateWithoutAttendanceRecordsInput,
      StaffMemberUncheckedCreateWithoutAttendanceRecordsInput
    >;
    where?: StaffMemberWhereInput;
  };

  export type StaffMemberUpdateToOneWithWhereWithoutAttendanceRecordsInput = {
    where?: StaffMemberWhereInput;
    data: XOR<
      StaffMemberUpdateWithoutAttendanceRecordsInput,
      StaffMemberUncheckedUpdateWithoutAttendanceRecordsInput
    >;
  };

  export type StaffMemberUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: StringFieldUpdateOperationsInput | string;
    department?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StaffMemberUncheckedUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: StringFieldUpdateOperationsInput | string;
    department?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerCreateWithoutAttendanceRecordsInput = {
    id?: string;
    name: string;
    designation?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerUncheckedCreateWithoutAttendanceRecordsInput = {
    id?: string;
    name: string;
    designation?: string | null;
    phone?: string | null;
    status?: $Enums.RecordStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerCreateOrConnectWithoutAttendanceRecordsInput = {
    where: ManagerWhereUniqueInput;
    create: XOR<
      ManagerCreateWithoutAttendanceRecordsInput,
      ManagerUncheckedCreateWithoutAttendanceRecordsInput
    >;
  };

  export type ManagerUpsertWithoutAttendanceRecordsInput = {
    update: XOR<
      ManagerUpdateWithoutAttendanceRecordsInput,
      ManagerUncheckedUpdateWithoutAttendanceRecordsInput
    >;
    create: XOR<
      ManagerCreateWithoutAttendanceRecordsInput,
      ManagerUncheckedCreateWithoutAttendanceRecordsInput
    >;
    where?: ManagerWhereInput;
  };

  export type ManagerUpdateToOneWithWhereWithoutAttendanceRecordsInput = {
    where?: ManagerWhereInput;
    data: XOR<
      ManagerUpdateWithoutAttendanceRecordsInput,
      ManagerUncheckedUpdateWithoutAttendanceRecordsInput
    >;
  };

  export type ManagerUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerUncheckedUpdateWithoutAttendanceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    designation?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttendanceRecordCreateManyStaffInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AttendanceRecordUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttendanceRecordUncheckedUpdateWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AttendanceRecordUncheckedUpdateManyWithoutStaffInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerAttendanceRecordCreateManyManagerInput = {
    id?: string;
    date: Date | string;
    shift?: string | null;
    status?: $Enums.AttendanceStatus;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ManagerAttendanceRecordUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerAttendanceRecordUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ManagerAttendanceRecordUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    shift?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumAttendanceStatusFieldUpdateOperationsInput | $Enums.AttendanceStatus;
    remarks?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
