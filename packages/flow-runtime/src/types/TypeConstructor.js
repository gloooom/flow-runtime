/* @flow */

import Type from './Type';
import type Validation, {ErrorTuple, IdentifierPath} from '../Validation';
import type {Constructor} from './';

import TypeParameterApplication from './TypeParameterApplication';

export default class TypeConstructor<T> extends Type {
  typeName: string = 'TypeConstructor';
  name: string;
  impl: ? Constructor<T>;

  *errors (validation: Validation<any>, path: IdentifierPath, input: any): Generator<ErrorTuple, void, void> {
    throw new Error(`Not implemented: errors().`);
  }

  accepts <P> (input: any, ...typeInstances: Type<P>[]): boolean {
    throw new Error(`Not implemented: accepts().`);
  }

  compareWith (input: Type<any>): -1 | 0 | 1 {
    throw new Error(`Not implemented: compareWith().`);
  }

  inferTypeParameters <P> (input: any): Type<P>[] {
    throw new Error(`No inferrer for ${this.name}.`);
  }

  apply <P> (...typeInstances: Type<P>[]): TypeParameterApplication<P, T> {
    const target = new TypeParameterApplication(this.context);
    target.parent = this;
    target.typeInstances = typeInstances;
    return target;
  }

  /**
   * Get the inner type or value.
   */
  unwrap (): TypeConstructor<T> {
    return this;
  }

  toString (): string {
    return this.name;
  }

  toJSON () {
    return {
      typeName: this.typeName,
      name: this.name
    };
  }

}
