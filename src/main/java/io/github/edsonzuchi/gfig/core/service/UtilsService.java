package io.github.edsonzuchi.gfig.core.service;

import org.springframework.stereotype.Service;

@Service
public interface UtilsService {

    boolean isEmpty(String str);
    boolean isEmpty(Long str);
    boolean isEmpty(Float str);
    boolean isEmpty(Double str);
    boolean isEmpty(Boolean str);
    boolean isEmpty(Integer str);
}
