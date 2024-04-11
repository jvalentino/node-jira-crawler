// testing
const expect = require("chai").expect;
const sinon = require('sinon');
const subject = require("../../src/service/flatten-service");

// mocks

describe("flatten-service.js", function() {
        
    beforeEach(() => {
    });

    afterEach(() => {
        sinon.restore();   
    });

    it("test recursiveFlatten", function() {
        // given
        const list = [
            {
                a: 1,
                b: {
                    c: 2,
                    d: 3
                },
                e: [
                    {
                        f: 4,
                        g: 5,
                        h: 99
                    },
                    {
                        f: 6,
                        g: 7
                    }
                ]
            }
        ];
        const listKey = 'e';

        // when
        const results = subject.recursiveFlatten(list, listKey);

        // then
        const expected = [
            { a: 1, 'b.c': 2, 'b.d': 3, f: 4, g: 5, h: 99},
            { a: 1, 'b.c': 2, 'b.d': 3, f: 6, g: 7, h: null }
          ];
        //console.log(results);
        expect(results).deep.equals(expected);
    });

    it("test flatten", async function() {
        // given
        const data = {
            a: 1,
            b: {
                c: 2,
                d: 3
            },
            e: []
        };

        // when
        const results = subject.flatten(data);

        // then
        expect(results).deep.equals({
            a: 1,
            'b.c': 2,
            'b.d': 3
        });
    });

    it("test findUniqueKeys", function() {
        // given
        const list = [
            { a: 1, b: 2 },
            { a: 3, c: 4 }
        ];

        // when
        const results = subject.findUniqueKeys(list);

        // then
        expect(results).deep.equals(new Set(['a', 'b', 'c']));
    });

    
});
